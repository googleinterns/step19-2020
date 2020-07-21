package com.google.sps.data;

import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretVersionName;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public final class APISecret {
  private static final Object SYNC_OBJECT = new Object();
  private static SecretManagerServiceClient client;

  private static SecretManagerServiceClient getClient() throws IOException {
    if (client == null) {
      synchronized (SYNC_OBJECT) {
        if (client == null) {
          client = SecretManagerServiceClient.create();
        }
      }
    }

    return client;
  }

  public static byte[] getSecretBytes(String name) throws IOException {
    SecretManagerServiceClient secretClient = getClient();
    SecretVersionName secretVersionName = SecretVersionName.of("step-peas-in-a-pod", name, "latest");
    return secretClient.accessSecretVersion(secretVersionName).getPayload().getData().toByteArray();
  }

  public static String getSecretString(String name) throws IOException {
    return new String(getSecretBytes(name), StandardCharsets.UTF_8);
  }
}
