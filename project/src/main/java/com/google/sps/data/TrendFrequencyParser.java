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

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Characters;
import javax.xml.stream.events.XMLEvent;

import com.google.sps.data.TrendRSS;
import com.google.sps.data.TrendRSSFeed;

public class TrendFrequencyParser {
  // These are the xml tags that data is being extracted from. 
  static final String TITLE = "title";
  static final String TRAFFIC = "approx_traffic";
  static final String ITEM = "item";

  final URL url;

  public TrendFrequencyParser(String feedUrl) {
    try {
      this.url = new URL(feedUrl);
    } catch (MalformedURLException e) {
      throw new RuntimeException(e);
    }
  }

  public TrendRSSFeed readTrends() {
    InputStream in = read();
    return readTrendsFromStream(in);
  }

  public TrendRSSFeed readTrendsFromStream(InputStream stream) {
    TrendRSSFeed feed = null;
    try {
      boolean isFeedHeader = true;
      String title = "";
      String trendFrequency = "";

      XMLInputFactory inputFactory = XMLInputFactory.newInstance();
      XMLEventReader eventReader = inputFactory.createXMLEventReader(stream);
      while (eventReader.hasNext()) {
        XMLEvent event = eventReader.nextEvent();
        if (event.isStartElement()) {
          String localPart = event.asStartElement().getName().getLocalPart();
          switch(localPart) {
            case ITEM:
              if (isFeedHeader) {
                isFeedHeader = false;
                feed = new TrendRSSFeed(title, trendFrequency);
              }
              event = eventReader.nextEvent();
              break;
            case TITLE:
              title = getCharacterData(event, eventReader);
              break;
            case TRAFFIC:
              trendFrequency = getCharacterData(event, eventReader);
              break;
          }
        } else if (event.isEndElement()) {
          if (event.asEndElement().getName().getLocalPart() == (ITEM)) {
            TrendRSS trend = new TrendRSS();
            trend.setTitle(title);
            trend.setFreq(trendFrequency);
            feed.getTrends().add(trend);
            event = eventReader.nextEvent();
            continue;
          }
        }
      }
    } catch (XMLStreamException e) {
      throw new RuntimeException(e);
    }
    return feed;
  }

  /* This is used to get text from an xml tag. */
  private String getCharacterData(XMLEvent event, XMLEventReader eventReader) throws XMLStreamException {
    String result = "";
    event = eventReader.nextEvent();
    if (event instanceof Characters) {
      result = event.asCharacters().getData();
    }
    return result;
  }

  private InputStream read() {
    try {
      return url.openStream();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}