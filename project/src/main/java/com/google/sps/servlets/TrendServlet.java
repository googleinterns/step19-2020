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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.net.URL;
import java.util.List;
import com.google.gson.Gson;
import com.google.sps.data.Trend;
import com.google.sps.data.TrendRSS;
import com.google.sps.data.TrendRSSFeed;
import com.google.sps.data.TrendFrequencyParser;

@WebServlet("/trends")
public class TrendServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // TODO: make getTrends() an automated function. Right now, whenever you make a GET request to '/trends' it adds
    // trends to the Datastore and it should only be doing this at certain times.
    getTrends();
    showTrends(response);
  }

  /* displays trends in json format */
  public void showTrends(HttpServletResponse response) throws IOException {
    
    Query query = new Query("Trend").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Trend> trends = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String title = (String) entity.getProperty("title");
      long frequency = (long) entity.getProperty("traffic");
      long timestamp = (long) entity.getProperty("timestamp");
      Trend trend = new Trend(id, title, frequency, timestamp);
      trends.add(trend);
    }

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(trends));
  }

  public void storeTrend(String topic, String frequency) {
    long timestamp = System.currentTimeMillis();
    Integer freq = convertToInt(frequency);
    Entity trendEntity = new Entity("Trend");
    trendEntity.setProperty("title", topic);
    if (freq != null) {
      trendEntity.setProperty("traffic", freq.intValue());
    }
    trendEntity.setProperty("timestamp", timestamp);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(trendEntity);
  }

  public Integer convertToInt(String stringNumber) {
    String result = stringNumber.replaceAll("[^\\w\\s]","");
    try {
      Integer i = Integer.parseInt(result.trim());
      return i;
    } catch (NumberFormatException e) {
      return null;
    }
  }

  /* loops through the top four trends and stores them in Datastore */
  public void getTrends() throws IOException {
    int topicsLimit = 4;

    TrendFrequencyParser parser = new TrendFrequencyParser("https://trends.google.com/trends/trendingsearches/daily/rss?geo=US");
    TrendRSSFeed feed = parser.readTrends();
    List<TrendRSS> trends = feed.getTrends();

    for (int i = 0; i < topicsLimit; i++) {
      TrendRSS trend = trends.get(i);
      storeTrend(trend.getTitle(), trend.getFreq());
    }
  }
} 


