package com.apitesting.client;

import com.apitesting.support.builders.ApiSpecBuilders;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class ProductClient {
    public Response search(String query) {
        return given()
                .spec(ApiSpecBuilders.requestSpec())
                .queryParam("q", query)
                .when()
                .get("/products");
    }
}