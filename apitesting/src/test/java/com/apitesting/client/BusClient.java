package com.apitesting.client;

import com.apitesting.support.builders.ApiSpecBuilders;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class BusClient {
    public Response get() {
            return given()
                    .spec(ApiSpecBuilders.requestSpec())
                    .when()
                    .get("/buses");
        }

    public Response getSeat(String id) {
        return given()
                .spec(ApiSpecBuilders.requestSpec())
                .pathParam("id", id)
                .when()
                .get("/buses/{id}/seats");
    }
}
