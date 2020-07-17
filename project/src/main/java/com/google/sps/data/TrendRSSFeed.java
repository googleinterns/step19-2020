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

import java.util.ArrayList;
import java.util.List;

/* Stores the entire Google Trends RSS Feed.*/

public class TrendRSSFeed {
  final String title;
  final String trendFrequency;

  final List<TrendRSS> entries = new ArrayList<TrendRSS>();

  public TrendRSSFeed(String title, String trendFrequency) {
    this.title = title;
    this.trendFrequency = trendFrequency;
  }

  public List<TrendRSS> getTrends() {
    return entries;
  }

  public String getTitle() {
    return title;
  }

  public String getFrequency() {
    return trendFrequency;
  }
}
