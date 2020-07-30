package com.google.sps.data;

import okhttp3.*;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonArray;

public class GeoService {

  // This list stores all the countries that Google collects Trend data on.
  private List<String> validCountryList =
      Arrays.asList(
          "AR", "AU", "AT", "BE", "BR", "CA", "CL", "CO", "CZ", "DK", "EG", "FI", "FR", "DE", "GR",
          "HK", "HU", "IN", "ID", "IE", "IL", "IT", "JP", "KE", "KR", "MY", "MX", "NL", "NZ", "NG",
          "NO", "PH", "PL", "PT", "RO", "RU", "SA", "SG", "ZA", "SE", "CH", "TW", "TH", "TR", "UA",
          "GB", "US", "VN");

  private final OkHttpClient httpClient = new OkHttpClient();

  private String API_KEY = getGeoKey();

  private String getGeoKey() {
    try {
      return APISecret.getSecretString("GEO_API_KEY");
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

  // This function can be used to get all the countries which Google has trend data on. It has a
  // runtime of around 20s
  // and since valid countries are unlikely to change soon, the validCountryList can be used in
  // place.
  public List<String> getValidCountries() throws MalformedURLException, IOException {

    JsonParser parser = new JsonParser();
    try {
      // countryCodes links to a file containing a json list of 247 countries and their ISO codes.
      URL countryCodes =
          new URL(
              "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json");
      String inputLine = readUrl(countryCodes);
      List<String> validCountries = new ArrayList<>();
      JsonArray a = (JsonArray) parser.parse(inputLine);
      validCountries.addAll(checkValidity(a));
      return validCountries;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // This function turns the data from the passed in URL to a readable string.
  public String readUrl(URL url) throws IOException {
    BufferedReader reader = null;
    try {
      reader = new BufferedReader(new InputStreamReader(url.openStream()));
      StringBuffer buffer = new StringBuffer();
      int read;
      char[] chars = new char[1024];
      while ((read = reader.read(chars)) != -1) {
        buffer.append(chars, 0, read);
      }
      return buffer.toString();
    } finally {
      if (reader != null) {
        reader.close();
      }
    }
  }

  // This function goes through each country and checks if it has an accessible Google trend RSS
  // feed. It returns
  // a list of countries that do.
  private List<String> checkValidity(JsonArray a) {
    try {
      List<String> results = new ArrayList<>();
      for (Object o : a) {
        JsonObject countryObject = (JsonObject) o;
        String country = countryObject.get("Code").getAsString();
        String url =
            String.format(
                "https://trends.google.com/trends/trendingsearches/daily/rss?geo=%s", country);

        Request request = new Request.Builder().url(url).head().build();

        try (Response response = httpClient.newCall(request).execute()) {
          if (response.isSuccessful()) {
            results.add(country);
          }
        }
      }
      return results;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  public List<String> getCountryList() {
    return validCountryList;
  }

  // This function sends a POST request to the Geolocation API and gets back the coordinates from
  // the IP Address which the request was sent from.
  public JsonObject getUserCoordinates() throws IOException {
    RequestBody formBody = new FormBody.Builder().build();

    Request request =
        new Request.Builder()
            .url(
                String.format(
                    "https://www.googleapis.com/geolocation/v1/geolocate?key=%s", API_KEY))
            .addHeader("User-Agent", "OkHttp Bot")
            .addHeader("Content-Type", "application/json; utf-8")
            .post(formBody)
            .build();

    try (Response response = httpClient.newCall(request).execute()) {

      if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

      JsonObject location = new Gson().fromJson(response.body().string(), JsonObject.class);
      JsonObject coords = location.get("location").getAsJsonObject();

      return coords;
    }
  }

  // This function takes in a set of coordinates and sends a request to the Geocoding API. The
  // function returns the country
  // code of those coordinates.
  public String getUserCountry(JsonObject coordinates) throws IOException {
    String url =
        String.format(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&key=%s",
            coordinates.get("lat").getAsString(), coordinates.get("lng").getAsString(), API_KEY);
    Request request = new Request.Builder().url(url).build();
    try (Response response = httpClient.newCall(request).execute()) {

      if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

      // Get response body
      JsonArray results =
          new Gson()
              .fromJson(response.body().string(), JsonObject.class)
              .get("results")
              .getAsJsonArray();
      JsonObject countryObject = results.get(results.size() - 1).getAsJsonObject();
      JsonObject countryCodeObject =
          countryObject.get("address_components").getAsJsonArray().get(0).getAsJsonObject();
      String countryCode = countryCodeObject.get("short_name").getAsString();
      return countryCode;
    }
  }

  // This function checks if the user's country is supported.
  public boolean isUserLocationSupported(String country) {
    return validCountryList.contains(country);
  }

  // This function returns the user's country if supported or 'global' if not.
  public String formulateRSSFeedQuery(String country) {
    if (isUserLocationSupported(country)) {
      return country;
    } else {
      return "global";
    }
  }

  public String getUserLocation() {
    try {
      return getUserCountry(getUserCoordinates());
    } catch (IOException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }
}
