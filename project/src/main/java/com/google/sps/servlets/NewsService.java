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

import java.net.*;
import java.util.*;



/** Service class that delivers news under a requested topic. */
public class NewsService {
  // one instance, reuse
  private final OkHttpClient httpClient = new OkHttpClient();
  private final NewsRepository newsRepository = new NewsRepository();

  // List of Topic names is passed in along with the number of articles for each topic, then Topic Objects are generated pairing topic names with article lists which are all returned in one big Topic Object list.
  public List<Topic> populateTopics(List<Trend> trends, int numArticles) {
    List<Topic> topics = new ArrayList<Topic>();
    List<Article> articles;
    for(int i = 0; i < trends.size(); i++) {
      String topicName = trends.get(i).getTitle();
      long frequency = trends.get(i).getFrequency();
      articles = retrieveNewArticles(topicName, numArticles);
      Topic topic = new Topic(topicName, frequency, articles);
      topics.add(topic);
    }

    return topics;
  }

  // Retrieves articles from the Google News RSS Feed using the topic parameter as the search query
  // The Topic parameter allows for spaces and non-alphanumeric characters. Null and "" are invalid arguments.
  public List<Article> retrieveNewArticles(String topic, int numArticles) {
    String url = String.format("https://news.google.com/rss/search?q=%s", topic);
    List<Article> articles;
    try {
      articles = cleanSyndFeed(getSyndFeed(url), numArticles);
    } catch(Exception exception) {
      articles = null;
      exception.printStackTrace();
    }

    return articles;
  }

  private SyndFeed getSyndFeed(String url) throws Exception{
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
    // We have to remove the first two element in the List since it's filled with metadata and irrelevant info for our purposes
    syndEntries.remove(0);
    syndEntries.remove(0);

    // We move the necessary information from each SyndEntry into a Java POJO class that is much more simple and easy to access, and we add each element to a list the size of the number of articles requested.
    List<Article> articles = new ArrayList<Article>();
    for(int i = 0; i < numArticles; i++) {
      SyndEntry syndEntry = syndEntries.get(i);
      Float articleSentiment = findSentimentScore(syndEntry.getTitle()); // We find the sentiment of the article's title
      Article article = new Article(syndEntry.getTitle(), syndEntry.getLink(), syndEntry.getPublishedDate(), syndEntry.getDescription().getValue(), syndEntry.getSource().getTitleEx().getValue(), articleSentiment);
      articles.add(article);
    }

    return articles;
  }

  // We run a sentiment analysis on the String parameter and return a float representing the sentiment
  private Float findSentimentScore(String articleTitle) {

    try (LanguageServiceClient language = LanguageServiceClient.create()) {
      Document doc = Document.newBuilder().setContent(articleTitle).setType(Type.PLAIN_TEXT).build();
      AnalyzeSentimentResponse response = language.analyzeSentiment(doc);
      Sentiment sentiment = response.getDocumentSentiment();
      if (sentiment == null) {
        return null;
      } else {
        return sentiment.getScore();
      }
    } catch(Exception exception) {
      exception.printStackTrace();
      return null;
    }
  }
}