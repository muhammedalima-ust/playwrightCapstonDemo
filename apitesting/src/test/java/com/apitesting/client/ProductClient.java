package com.apitesting.client;

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