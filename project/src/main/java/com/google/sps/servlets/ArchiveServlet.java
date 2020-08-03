package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;
import com.google.sps.data.Trend;
import com.google.gson.Gson;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;
import com.google.gson.Gson;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;

@WebServlet("/archive")
public class ArchiveServlet extends HttpServlet {

  public long millisInDay = 86400000;

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String stringDate = request.getParameter("date");
    long millis = 0;
    try {
      millis = convertStringtoMillis(stringDate);
      System.out.println(millis);
    } catch (ParseException e) {
      e.printStackTrace();
    }
    PreparedQuery results = getFilteredQuery(millis);
    Iterator<Entity> totalTrends = results.asIterable().iterator();
    
    response.setContentType("application/json");
    String json = convertToJson(getTrends(totalTrends));
    response.getWriter().println(json);
  }

  private String convertToJson(List<Trend> trends) {
    Gson gson = new Gson();
    String json = gson.toJson(trends);
    return json;
  }

  private long convertStringtoMillis(String requestedDate) throws ParseException {
    SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
    Date date = sdf.parse(requestedDate);
    return date.getTime();
  }

  private PreparedQuery getFilteredQuery(long time) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Filter startFilter = new FilterPredicate("timestamp", FilterOperator.GREATER_THAN_OR_EQUAL, time);
    Filter endFilter = new FilterPredicate("timestamp", FilterOperator.LESS_THAN_OR_EQUAL, time + millisInDay);
    CompositeFilter dayRangeFilter = CompositeFilterOperator.and(startFilter, endFilter);
    Query query = new Query("Trend").setFilter(dayRangeFilter).addSort("timestamp", SortDirection.DESCENDING);
    return datastore.prepare(query);
  }

  private List<Trend> getTrends(Iterator<Entity> resultingTrends) {
    List<Trend> trends = new ArrayList<>();
    while (resultingTrends.hasNext()) {
      Entity entity = resultingTrends.next();
      long timestamp = (long) entity.getProperty("timestamp");
      long id = entity.getKey().getId();
      String title = (String) entity.getProperty("title");
      long frequency = (long) entity.getProperty("traffic");
      Trend trend = new Trend(id, title, frequency, timestamp);
      trends.add(trend);
    }
    return trends;
  }
}
