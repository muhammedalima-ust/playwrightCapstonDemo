package com.apitesting.data.secrets;

import io.github.cdimascio.dotenv.Dotenv;

import java.util.Locale;

public final class Secrets {

    private static final Dotenv dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .load();

    private Secrets() {
    }

    public static String get(String key) {
        String normalizedKey = key == null ? "" : key.trim();

        String value = getFromEnvironment(normalizedKey);
        if (value == null || value.isBlank()) {
            value = dotenv.get(normalizedKey.toUpperCase(Locale.ROOT));
        }
        if (value == null || value.isBlank()) {
            value = dotenv.get(normalizedKey);
        }

        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Missing secret: " + key);
        }

        return value;
    }

    private static String getFromEnvironment(String key) {
        if (key.isBlank()) {
            return null;
        }

        String upperKey = key.toUpperCase(Locale.ROOT);
        String value = System.getenv(upperKey);
        if (value != null && !value.isBlank()) {
            return value;
        }

        return System.getenv(key);
    }
}