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
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;

import java.net.*;
import java.util.*;

/** Service class that delivers news under a requested topic. */
public class NewsService {
  // one instance, reuse
  private final OkHttpClient httpClient = new OkHttpClient();

  // Retrieves articles from the Google News RSS Feed using the topic parameter as the search query
  // The Topic parameter allows for spaces and non alphanumeric characters, but null and "" is an invalid argument
  public String retrieveNewArticles(String topic, int numArticles) {
    String url = String.format("https://news.google.com/rss/search?q=%s", topic);
    String articleXml;
    try {
      articleXml = cleanSyndFeed(getSyndFeed(url), numArticles).toString();
    } catch(Exception exception) {
      articleXml = "Exception occured when requesting articles from the Google RSS News Feed";
    }

    return articleXml;
  }

  private SyndFeed getSyndFeed(String url) throws Exception{
    // Encode URL so that it can include spaces
    String encodedUrl = url.replaceAll(" ", "%20");
    // Builiding SyndFeed
    URL feedSource = new URL(encodedUrl);
    SyndFeedInput input = new SyndFeedInput();
    SyndFeed feed = input.build(new XmlReader(feedSource));

    return feed;
  }

  private List<Article> cleanSyndFeed(SyndFeed syndFeed, int numArticles) {
    // We extract the entries into a managable list
    List<SyndEntry> syndEntries = syndFeed.getEntries();
    // We have to remove the first two element in the List since it's filled with metadata and irrelevant info for our purposes
    syndEntries.remove(0);
    syndEntries.remove(0);

    // We move the necessary information from each SyndEntry into a Java POJO class that is much more simple and easy to access, and we add each element to a list the size of the number of articles requested.
    List<Article> articles = new ArrayList<Article>();
    for(int i = 0; i < numArticles; i++) {
      SyndEntry syndEntry = syndEntries.get(i);
      Article article = new Article(syndEntry.getTitle(), syndEntry.getLink(), syndEntry.getPublishedDate(), syndEntry.getDescription().getValue(), syndEntry.getSource().getTitleEx().getValue());
      articles.add(article);
    }

    return articles;
  }
}