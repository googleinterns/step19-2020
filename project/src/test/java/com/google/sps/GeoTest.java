package com.google.sps;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import java.util.List;
import java.util.ArrayList;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import com.google.sps.data.GeoService;
import java.util.Collections;
import java.net.URL;
import com.google.gson.JsonObject;
import java.io.RandomAccessFile;

@RunWith(JUnit4.class)
public final class GeoTest {
  GeoService geoService = new GeoService();

  @Test
  public void readUrlTest() throws IOException {
    String actual = geoService.readUrl(new URL("https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json"));
    RandomAccessFile file = new RandomAccessFile("src/test/java/com/google/sps/CountryJson.txt", "r");
    String expected = file.readLine();
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void getUserCountryTest() throws IOException {
    String expected = "US";
    JsonObject testCoords = new JsonObject();
    testCoords.addProperty("lat", "40.7128");
    testCoords.addProperty("lng", "-74.0060");
    String actual = geoService.getUserCountry(testCoords);
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void getUserCountryTestForeign() throws IOException {
    String expected = "FR";
    JsonObject testCoords = new JsonObject();
    testCoords.addProperty("lat", "48.8566");
    testCoords.addProperty("lng", "2.3522");
    String actual = geoService.getUserCountry(testCoords);
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void formulateRSSFeedQuery() {
    String expected = "US";
    String actual = geoService.formulateRSSFeedQuery("US");
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void formulateRSSFeedQueryUnvalidCountry() {
    String expected = "global";
    String actual = geoService.formulateRSSFeedQuery("CN");
    Assert.assertEquals(expected, actual);
  }    
}