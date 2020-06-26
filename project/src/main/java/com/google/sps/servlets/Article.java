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

import java.util.Date;

/** Article class that serves as a Model for each article retrieved by the API. */
public class Article {
  private String title;
  private String link;
  private Date pubDate;
  private String description;
  private String source;

  public Article(String title, String link, Date pubDate, String description, String source) {
    this.title = title;
    this.link = link;
    this.pubDate = pubDate;
    this.description = description;
    this.source = source;
  }

  public String getTitle() {
    return title;
  }

  public String getLink() {
    return link;
  }

  public Date getPubDate() {
    return pubDate;
  }

  public String getDescription() {
    return description;
  }

  public String getSource() {
    return source;
  }

  public String toString() {
    return String.format("%s %s %s %s %s", title, link, pubDate.toString(), description, source);
  }
}