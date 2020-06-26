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

public final class Trend {

  private final long id;
  private final String title;
  private final long frequency;
  private final long timestamp;

  public Trend(long id, String title, long frequency, long timestamp) {
    this.id = id;
    this.title = title;
    this.frequency = frequency;
    this.timestamp = timestamp;
  }
}