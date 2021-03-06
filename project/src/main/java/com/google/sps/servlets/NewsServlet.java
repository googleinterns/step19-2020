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

import java.util.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.data.Trend;
import com.google.sps.data.TrendService; // imports class needed to store trends and retrieve trends
// from Datastore
import com.google.sps.data.GeoService;

/**
 * Servlet that returns articles and topics that are requested at the /news endpoint "num" parameter
 * required.
 */
@WebServlet("/news")
public class NewsServlet extends HttpServlet {

  private NewsService newsService = new NewsService();
  private TrendService trendService = new TrendService();
  private GeoService geoService = new GeoService();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String lat = request.getParameter("lat");
    String lon = request.getParameter("long");
    String country;
    if (lat == null || lon == null) {
      country = "US";
    } else {
      country = geoService.getUserCountry(lat, lon);
    }
    List<Trend> trends = trendService.showTrends(country);
    response.setContentType("text/html;");
    int numArticles = Integer.parseInt(request.getParameter("num"));
    List<Topic> topics = newsService.populateTopics(trends, country, numArticles);
    Collections.reverse(topics);
    String jsonString = convertToJson(topics).replaceAll("’", "\u0027");
    jsonString = jsonString.replaceAll("‘", "\u0027");
    response.getWriter().println(jsonString);
  }

  private String convertToJson(List<Topic> list) {
    GsonBuilder builder = new GsonBuilder();
    Gson gson = builder.create();
    String json = gson.toJson(list);
    return json;
  }
}
