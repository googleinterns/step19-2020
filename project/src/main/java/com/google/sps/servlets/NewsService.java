// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import okhttp3.*;
import java.io.IOException;
import com.rometools.rome.feed.synd.SyndFeed;
import com.google.cloud.language.v1.AnalyzeSentimentResponse;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.cloud.language.v1.*;
import com.google.cloud.language.v1.Document.Type;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import com.google.sps.data.Trend;
import com.google.sps.data.VideoService;
import com.google.sps.data.Video;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonArray;

import java.net.*;
import java.util.*;

/** Service class that delivers news under a requested topic. */
public class NewsService {
  // one instance, reuse
  private final OkHttpClient httpClient = new OkHttpClient();
  private final NewsRepository newsRepository = new NewsRepository();
  private final VideoService videoService = new VideoService();

  private static final LanguageServiceClient language = createLangClient();

  // This creates a language service client that can be used to call the sentiment analyzer.
  private static LanguageServiceClient createLangClient() {
    try {
      return LanguageServiceClient.create();
    } catch (IOException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  // List of Topic names is passed in along with the number of articles for each topic, then Topic
  // Objects are generated pairing topic names with article lists which are all returned in one big
  // Topic Object list.

  public List<Topic> populateTopics(
      List<Trend> trends, String language, int numArticles, String country) throws IOException {
    List<Topic> topics = new ArrayList<Topic>();
    List<Article> articles;
    List<Video> videos;
    for (int i = 0; i < trends.size(); i++) {
      String topicName = trends.get(i).getTitle();
      long frequency = trends.get(i).getFrequency();
      // Not every region has consistent news sources, so if we can't find the necessary amount of
      // articles, we default to American English articles which tend to be the most consistently
      // available
      articles = retrieveNewArticles(topicName, language, numArticles);
      videos = videoService.getRelatedVideos(topicName, country);

      if (articles.size() == 0) {
        articles = retrieveNewArticles(topicName, "en-US", numArticles);
      }
      Topic topic = new Topic(topicName, frequency, articles, videos);
      topics.add(topic);
    }

    return topics;
  }

  // The Topic parameter allows for spaces and non-alphanumeric characters. Null and "" are invalid
  // arguments.
  // Some of the country codes are America: en-US, Great Britain: en-GB, Mexico: es-MX, Germany:
  // de-DE,
  public List<Article> retrieveNewArticles(String topic, String language, int numArticles) {
    String url = String.format("https://news.google.com/rss/search?q=%s&hl=%s", topic, language);
    List<Article> articles;
    try {
      articles = cleanSyndFeed(getSyndFeed(url), numArticles);
    } catch (Exception exception) {
      articles = null;
      exception.printStackTrace();
    }

    return articles;
  }

  private SyndFeed getSyndFeed(String url) throws Exception {
    // Encode URL so that it can include spaces
    String encodedUrl = url.replaceAll(" ", "%20");
    // Building SyndFeed
    URL feedSource = new URL(encodedUrl);
    SyndFeedInput input = new SyndFeedInput();
    SyndFeed feed = input.build(new XmlReader(feedSource));

    return feed;
  }

  private List<Article> cleanSyndFeed(SyndFeed syndFeed, int numArticles) {
    // We extract the entries into a manageable list
    List<SyndEntry> syndEntries = syndFeed.getEntries();
    if (syndEntries.size() < numArticles) return new ArrayList<Article>();
    // We have to remove the first two element in the List since it's filled with metadata and
    // irrelevant info for our purposes
    syndEntries.remove(0);
    syndEntries.remove(0);

    // We move the necessary information from each SyndEntry into a Java POJO class that is much
    // more simple and easy to access, and we add each element to a list the size of the number of
    // articles requested.
    List<Article> articles = new ArrayList<Article>();
    for (int i = 0; i < numArticles; i++) {
      SyndEntry syndEntry = syndEntries.get(i);
      Article article =
          new Article(
              syndEntry.getTitle(),
              syndEntry.getLink(),
              syndEntry.getPublishedDate(),
              syndEntry.getDescription().getValue(),
              syndEntry.getSource().getTitleEx().getValue(),
              findSentimentScore(syndEntry.getTitle()));
      articles.add(article);
    }

    return articles;
  }

  // We run a sentiment analysis on the String parameter and return a float representing the
  // sentiment
  private Float findSentimentScore(String articleTitle) {
    Document doc = Document.newBuilder().setContent(articleTitle).setType(Type.PLAIN_TEXT).build();
    AnalyzeSentimentResponse response = language.analyzeSentiment(doc);
    Sentiment sentiment = response.getDocumentSentiment();
    if (sentiment == null) {
      return null;
    } else {
      return sentiment.getScore();
    }
  }
}
