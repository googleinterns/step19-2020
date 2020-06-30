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

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

/** Topic class that serves as a Model for each Topic that is paired with a list of articles. */
@Entity
public class Topic {
  @Id
  private Long id;

  private String name;
  private int frequency;
  private List<Article> articles;

  public Topic(String name, int frequency, List<Article> articles) {
    this.name = name;
    this.frequency = frequency;
    this.articles = articles;
  }

  public String getName() {
    return name;
  }

  public int getFrequency() {
    return frequency;
  }

  public List<Article> getArticles() {
    return articles;
  }

  public String toString() {
    return String.format("Topic - %s : %s", name, articles);
  }
}