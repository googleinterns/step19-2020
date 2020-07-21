package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.data.GeoService;
import javax.servlet.annotation.WebServlet;

@WebServlet("/geo")
public class GeoServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    GeoService geoService = new GeoService();
    geoService.getValidCountries();
  }
}
