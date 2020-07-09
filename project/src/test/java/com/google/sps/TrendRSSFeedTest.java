package com.google.sps;

import com.google.sps.data.TrendFrequencyParser;
import com.google.sps.data.TrendRSS;
import com.google.sps.data.TrendRSSFeed;
import com.google.sps.data.TrendService;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import java.util.ArrayList;
import java.net.URL;
import java.util.List;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import static com.google.appengine.api.datastore.FetchOptions.Builder.withLimit;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import java.util.Arrays;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import java.net.MalformedURLException;

@RunWith(JUnit4.class)
public final class TrendRSSFeedTest {
  TrendService service = new TrendService();
  TrendFrequencyParser parser = new TrendFrequencyParser("https://mock.url");

  private final LocalServiceTestHelper helper = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  
  @Before
  public void setUp() {
    helper.setUp();
  }

  @Test
  public void ReadTrendsTest() throws IOException {
    TrendRSSFeed testfeed = parser.readTrendsFromStream(new FileInputStream(new File("/home/acnwigwe/step19-2020/project/src/test/java/com/google/sps/RSSFeed.xml")));
    Assert.assertNotNull(testfeed);
  }

  @Test
  public void GetTrendsTest() throws IOException {
    List<TrendRSS> results = parser.readTrendsFromStream(new FileInputStream(new File("/home/acnwigwe/step19-2020/project/src/test/java/com/google/sps/RSSFeed.xml"))).getTrends();
    Assert.assertEquals(results.size(), 20);
  }



  @Test
  public void IntConverterCatchesError() {
    Assert.assertNull(service.convertToInt("hello"));
  }

  @Test 
  public void IntConverterNumberStringTest() {
    Assert.assertEquals(398, service.convertToInt("398").intValue());
  }

  @Test
  public void IntConverterNumberandSymbolsStringTest() {
    Assert.assertEquals(398, service.convertToInt("398+").intValue());
  }

  @Test
  public void CheckTitleAfterMakeTrendTest() {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity trend = service.makeTrend("Marsha P. Johnson", "2,000,000+");
    Assert.assertEquals("Marsha P. Johnson", trend.getProperty("title"));
  }

  @Test
  public void CheckFreqAfterMakeTrendTest() {
    Entity trend = service.makeTrend("Marsha P. Johnson", "2,000,000+");
    Assert.assertEquals(2000000, trend.getProperty("traffic"));
  }

  @Test
  public void CheckFreqAfterInvalidMakeTrendTest() {
    Entity trend = service.makeTrend("Marsha P. Johnson", "hi");
    Assert.assertEquals(0, trend.getProperty("traffic"));
  }
}


