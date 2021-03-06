package com.google.sps;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import java.io.IOException;
import com.google.sps.data.GeoService;
import java.net.URL;
import java.io.RandomAccessFile;

@RunWith(JUnit4.class)
public final class GeoTest {
  GeoService geoService = new GeoService();

  @Test
  public void readUrlTest() throws IOException {
    String actual =
        geoService.readUrl(
            new URL(
                "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json"));
    RandomAccessFile file =
        new RandomAccessFile("src/test/java/com/google/sps/CountryJson.txt", "r");
    String expected = file.readLine();
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
