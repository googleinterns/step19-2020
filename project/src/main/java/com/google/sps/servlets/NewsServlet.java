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
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns articles and topics that are requested at the /news endpoint "num" parameter required. */
@WebServlet("/news")
public class NewsServlet extends HttpServlet {

  private NewsService newsService = new NewsService();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Temporary placeholder topics
    List<String> topicNames = new ArrayList<>();
    topicNames.add("Covid-19 Symptoms");
    topicNames.add("Mitch McConell");
    topicNames.add("Hand Sanitizer");
    topicNames.add("Minecraft Nether Update");

    // Temporary placeholder frequencies
    List<Integer> frequencies = new ArrayList<>();
    frequencies.add(100000);
    frequencies.add(100000);
    frequencies.add(50000);
    frequencies.add(50000);
    response.setContentType("text/html;");
    int numArticles = Integer.parseInt(request.getParameter("num"));
    String jsonString = convertToJson(newsService.populateTopics(topicNames, frequencies, numArticles));
    response.getWriter().println(jsonString);
  }

  private String convertToJson(List<Topic> list) {
    Gson gson = new Gson();
    String json = gson.toJson(list);
    return json;
  }
}
