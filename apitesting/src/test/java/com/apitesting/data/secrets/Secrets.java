package com.apitesting.data.secrets;

import io.github.cdimascio.dotenv.Dotenv;

import java.io.File;
import java.util.Locale;

public final class Secrets {

    private static final Dotenv dotenv = load();

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

    private static Dotenv load() {
        String[] candidates = { ".", "apitesting", "./apitesting", ".." };

        for (String candidate : candidates) {
            if (new File(candidate, ".env").isFile()) {
                System.out.println("[Secrets] Loading .env from: "
                        + new File(candidate, ".env").getAbsolutePath());
                return Dotenv.configure()
                        .directory(candidate)
                        .ignoreIfMissing()
                        .ignoreIfMalformed()
                        .load();
            }
        }

        System.out.println("[Secrets] WARNING: .env not found in any candidate directory. "
                + "user.dir=" + System.getProperty("user.dir"));
        return Dotenv.configure().ignoreIfMissing().ignoreIfMalformed().load();
    }
}