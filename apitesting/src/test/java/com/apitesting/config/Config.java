package com.apitesting.config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {

    private Config() {}

    private static final Dotenv dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .load();

    private static final String APIBASEURL =
            dotenv.get("APIBASEURL", "https://api.tripstack.doomple.com/");

    private static final String DB_JDBC_URL =
            dotenv.get("MUHAMMED_DB_JDBC_URL", "");

    private static final String DB_USERNAME =
            dotenv.get("MUHAMMED_DB_USERNAME", "");

    private static final String DB_PASSWORD =
            dotenv.get("MUHAMMED_DB_PASSWORD", "");

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