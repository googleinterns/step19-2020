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

  public List<Video> getRelatedVideos(String topic, String countryCode) throws IOException {
    String url =
        String.format(
            "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&order=relevance&regionCode=%s&q=%s&type=video&videoDefinition=high&key=%s",
            countryCode, formulateURLString(topic), API_KEY);

    Request request = new Request.Builder().url(url).build();
    List<Video> videoList = new ArrayList<>();
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
        Video video = makeVideoObject(id, videoJson.get("snippet").getAsJsonObject());
        videoList.add(video);
      }
    }
    return videoList;
  }

  public Video makeVideoObject(String id, JsonObject video) {
    String videoLink = String.format("https://www.youtube.com/watch?v=%s", id);
    return new Video(
        video.get("title").getAsString(),
        video.get("description").getAsString(),
        video
            .get("thumbnails")
            .getAsJsonObject()
            .get("medium")
            .getAsJsonObject()
            .get("url")
            .getAsString(),
        videoLink);
  }

  public String formulateURLString(String topic) {
    Pattern replace = Pattern.compile("\\s+");
    Matcher matcher = replace.matcher(topic);
    return matcher.replaceAll("+");
  }
}
