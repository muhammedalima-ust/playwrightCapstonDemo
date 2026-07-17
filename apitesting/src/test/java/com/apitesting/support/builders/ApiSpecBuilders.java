package com.apitesting.support.builders;

import com.apitesting.config.Config;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;

public class ApiSpecBuilders {
    public static RequestSpecification requestSpec() {
        return new RequestSpecBuilder()
                .setBaseUri(Config.APIURL())
                .setBasePath("/api")
                .setContentType("application/json")
                .build();
    }

    public static RequestSpecification authSpec(String token) {
        return new RequestSpecBuilder()
                .addRequestSpecification(requestSpec())
                .addHeader("Authorization", "Bearer " + token)
                .build();
    }
}