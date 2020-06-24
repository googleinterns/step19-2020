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

/** Service class that delivers news under a requested topic. */
public class NewsService {
  // one instance, reuse
  private final OkHttpClient httpClient = new OkHttpClient();

  // Retrieves articles from the Google News RSS Feed using the topic parameter as the search query
  // The Topic parameter allows for spaces and non alphanumeric characters, but null is an invalid argument
  public String retrieveNewArticles(String topic) {
    String url = String.format("https://news.google.com/rss/search?q=%s", topic);
    String articleXml;
    try {
      articleXml = httpRequest(url);
    } catch(IOException ioexeption) {
      articleXml = "IOException occured when requesting articles from the Google RSS News Feed";
    }

    return articleXml;
  }

  private String httpRequest(String url) throws IOException {
    Request request = new Request.Builder().url(url).build();

    try (Response response = httpClient.newCall(request).execute()) {
      if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
      // Get response body
      return response.body().string();
    }
  }
}