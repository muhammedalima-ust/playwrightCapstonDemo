package com.apitesting.data.secrets;

import io.github.cdimascio.dotenv.Dotenv;

import java.util.Locale;

public final class Secrets {

    private static final Dotenv dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .ignoreIfMalformed()
            .load();

    private Secrets() {
    }


    public static String get(String key) {
        String envKey = key == null ? "" : key.trim().toUpperCase(Locale.ROOT);

        String ciValue = System.getenv(envKey);
        if (ciValue != null && !ciValue.isBlank()) {
            return ciValue;
        }

        String envValue = dotenv.get(envKey);
        if (envValue != null && !envValue.isBlank()) {
            return envValue;
        }

        return "";
    }
}