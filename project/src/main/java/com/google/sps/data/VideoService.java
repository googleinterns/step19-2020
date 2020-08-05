package com.google.sps.data;

import okhttp3.*;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.google.sps.data.APISecret;
import com.google.sps.data.Video;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.Locale;

public class VideoService {

  private String API_KEY = getYoutubeKey();

  private final OkHttpClient httpClient = new OkHttpClient();

  private String getYoutubeKey() {
    try {
      return APISecret.getSecretString("YOUTUBE_KEY");
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

  public void newRelatedVideos(String topic, String countryCode) throws IOException {
    String url =
        String.format(
            "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&order=relevance&regionCode=%s&q=%s&type=video&videoDefinition=high&key=%s",
            countryCode, formulateURLString(topic), API_KEY);

    Request request = new Request.Builder().url(url).build();
    try (Response response = httpClient.newCall(request).execute()) {

      if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
      // Get response body
      JsonArray results =
          new Gson()
              .fromJson(response.body().string(), JsonObject.class)
              .get("items")
              .getAsJsonArray();
      for (int i = 0; i < 2; i++) {
        JsonObject videoJson = results.get(i).getAsJsonObject();
        String id = videoJson.get("id").getAsJsonObject().get("videoId").getAsString();
        storeVideos(id, topic, videoJson.get("snippet").getAsJsonObject());
      }
    }
  }

  public List<Video> getVideos(String topic) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Filter propertyFilter = new FilterPredicate("topic", FilterOperator.EQUAL, topic);
    Query query = new Query("Video").setFilter(propertyFilter);
    PreparedQuery results = datastore.prepare(query);
    List<Video> videos = new ArrayList<>();
    Iterator<Entity> totalVideos = results.asIterable().iterator();
    int i = 0;
    while (totalVideos.hasNext() && i < 2) {
      Entity entity = totalVideos.next();
      String title = (String) entity.getProperty("title");
      String description = (String) entity.getProperty("description");
      String thumbnail = (String) entity.getProperty("thumbnail");
      String link = (String) entity.getProperty("link");
      String date = (String) entity.getProperty("date");
      videos.add(new Video(title, description, thumbnail, link, date));
      i++;
    }
    return videos;
  }

  public String formulateURLString(String topic) {
    Pattern replace = Pattern.compile("\\s+");
    Matcher matcher = replace.matcher(topic);
    return matcher.replaceAll("+");
  }

  public void storeVideos(String id, String topicName, JsonObject video) {
    String videoLink = String.format("https://www.youtube.com/watch?v=%s", id);
    String date = convertToReadableDate(video.get("publishedAt").getAsString());
    Entity videoEntity = new Entity("Video");
    videoEntity.setProperty("topic", topicName);
    videoEntity.setProperty("title", video.get("title").getAsString());
    videoEntity.setProperty("description", video.get("description").getAsString());
    videoEntity.setProperty(
        "thumbnail",
        video
            .get("thumbnails")
            .getAsJsonObject()
            .get("medium")
            .getAsJsonObject()
            .get("url")
            .getAsString());
    videoEntity.setProperty("link", videoLink);
    videoEntity.setProperty("date", date);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(videoEntity);
  }

  public String convertToReadableDate(String date) {
    DateTimeFormatter inputFormatter =
        DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.ENGLISH);
    DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd-MM-yyy", Locale.ENGLISH);
    LocalDate newDate = LocalDate.parse(date, inputFormatter);
    String formattedDate = outputFormatter.format(newDate);
    return formattedDate;
  }
}
