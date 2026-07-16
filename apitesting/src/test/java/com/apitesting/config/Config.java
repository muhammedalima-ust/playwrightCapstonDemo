package com.apitesting.config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {

    private Config() {}

    private static final Dotenv dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .load();

    private static final String BASEURL =
            dotenv.get("baseUrl", "http://localhost:8080");

    private static final String APIURL =
            dotenv.get("apiUrl", "http://localhost:8080");

    private static final String BROWSER =
            dotenv.get("browser", "chrome");

    private static final String BROWSERSIZE =
            dotenv.get("browsersize", "1440x900");

    private static final boolean HEADLESS =
            Boolean.parseBoolean(
                    dotenv.get("headless", "false")
            );

    public static String BASEURL_UI() {
        return BASEURL;
    }

    public static String getPassword() {
        return BASEURL;
    }

    public static String APIURL() {
        return APIURL;
    }

    public static String BROWSER() {
        return BROWSER;
    }

    public static String BROWSERSIZE() {
        return BROWSERSIZE;
    }

    public static boolean HEADLESS() {
        return HEADLESS;
    }
}