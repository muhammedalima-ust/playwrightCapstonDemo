package com.apitesting.config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {

    private Config() {}

    private static final Dotenv dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .load();

    private static String getValueFromEnvOrDotenv(String key, String defaultValue) {
        String ciValue = System.getenv(key);
        if (ciValue != null && !ciValue.trim().isEmpty()) {
            return ciValue;
        }

        return dotenv.get(key, defaultValue);
    }

    private static final String APIBASEURL =
            getValueFromEnvOrDotenv("APIBASEURL", "https://api.tripstack.doomple.com/");

    private static final String DB_JDBC_URL =
            getValueFromEnvOrDotenv("MUHAMMED_DB_JDBC_URL", "");

    private static final String DB_USERNAME =
            getValueFromEnvOrDotenv("MUHAMMED_DB_USERNAME", "");

    private static final String DB_PASSWORD =
            getValueFromEnvOrDotenv("MUHAMMED_DB_PASSWORD", "");

    public static String APIBASEURL() {
        return APIBASEURL;
    }

    public static String DB_JDBC_URL() {
        return DB_JDBC_URL;
    }

    public static String DB_USERNAME() {
        return DB_USERNAME;
    }

    public static String DB_PASSWORD() {
        return DB_PASSWORD;
    }
}