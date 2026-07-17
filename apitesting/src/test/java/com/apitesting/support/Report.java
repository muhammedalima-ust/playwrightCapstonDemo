package com.apitesting.support;

import io.qameta.allure.Allure;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Report {
    private static final Logger log = LoggerFactory.getLogger(Report.class);

    public static void step(String message) {
        log.info("[INFO] {}", message);
        Allure.step(message);
    }

    public static void pass(String message) {
        log.info("[PASS] {}", message);
        Allure.step("PASS : " + message);
    }

    public static void fail(String message) {
        log.error("[FAIL] {}", message);
        Allure.step("FAIL : " + message);
    }

    public static void info(String key, Object value) {
        log.info("[INFO]  {} : {}", key, value);
        Allure.step("[INFO] : " + key + " = " + value);
    }
}