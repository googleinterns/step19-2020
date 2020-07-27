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

package com.google.sps.data;

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
import java.util.Iterator;
import com.google.sps.data.Trend;
import com.google.sps.data.TrendRSS;
import com.google.sps.data.TrendRSSFeed;
import com.google.sps.data.TrendFrequencyParser;

/* Class that contains all the functions needed to parse trends from a RSS Feed, store those trends in Datastore, and retreive them from Datastore in a list. */
public class TrendService {

  GeoService geo = new GeoService();
  /* Returns a list of trends. */
  public List<Trend> showTrends() {
    String country = geo.getUserLocation();
    if (country.equals("US")) {
      return getDatastoreTrends();
    }
    return getForeignCountryTrends(country);
  }

  public List<Trend> getForeignCountryTrends(String country) {
    List<TrendRSS> trendRSSList = getTrendRSSList(geo.formulateRSSFeedQuery(country));
    List<Trend> trends = new ArrayList<>();
    for (int i = 0; i < 4; i++) {
      TrendRSS trendRSS = trendRSSList.get(i);
      Trend trend =
          new Trend(
              8080,
              trendRSS.getTitle(),
              convertToInt(trendRSS.getFreq()),
              System.currentTimeMillis());
      trends.add(trend);
    }
    return trends;
  }

  public List<Trend> getDatastoreTrends() {
    Query query = new Query("Trend").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Trend> trends = new ArrayList<>();
    Iterator<Entity> totalTrends = results.asIterable().iterator();

    int i = 0;
    int topicsLimit = 4;

    while (totalTrends.hasNext() && i < topicsLimit) {
      Entity entity = totalTrends.next();
      long id = entity.getKey().getId();
      String title = (String) entity.getProperty("title");
      long frequency = (long) entity.getProperty("traffic");
      long timestamp = (long) entity.getProperty("timestamp");
      Trend trend = new Trend(id, title, frequency, timestamp);
      trends.add(trend);
      i++;
    }

    return trends;
  }

  /* Stores a Trend object in Datastore. */
  public Entity makeTrend(String topic, String frequency) {

    long timestamp = System.currentTimeMillis();
    Integer freq = convertToInt(frequency);
    Entity trendEntity = new Entity("Trend");
    trendEntity.setProperty("title", topic);
    if (freq != null) {
      trendEntity.setProperty("traffic", freq.intValue());
    } else {
      trendEntity.setProperty("traffic", 0);
    }
    trendEntity.setProperty("timestamp", timestamp);
    return trendEntity;
  }

  public void storeTrend(Entity trend) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(trend);
  }

  /* Converts a string to an Integer. */
  public Integer convertToInt(String stringNumber) {
    String result = stringNumber.replaceAll("[^\\w\\s]", "");
    try {
      Integer i = Integer.parseInt(result.trim());
      return i;
    } catch (NumberFormatException e) {
      return null;
    }
  }

  public List<TrendRSS> getTrendRSSList(String country) {
    TrendFrequencyParser parser =
        new TrendFrequencyParser(
            String.format(
                "https://trends.google.com/trends/trendingsearches/daily/rss?geo=%s", country));
    TrendRSSFeed feed = parser.readTrends();
    List<TrendRSS> trends = feed.getTrends();
    return trends;
  }

  /* Loops through the top four trends and stores them in Datastore. */
  public void newTrends() throws IOException {
    List<TrendRSS> trends = getTrendRSSList("US");
    limitTrends(4, trends);
  }

  public void limitTrends(int limit, List<TrendRSS> source) {
    for (int i = 0; i < limit; i++) {
      TrendRSS trend = source.get(i);
      storeTrend(makeTrend(trend.getTitle(), trend.getFreq()));
    }
  }
}
