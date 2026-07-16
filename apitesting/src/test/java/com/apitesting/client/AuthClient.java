package com.apitesting.client;

import com.apitesting.config.Config;
import com.apitesting.support.ApiSpecBuilders;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class AuthClient {
        public Response login(String email, String password) {
            return given()
                    .spec(ApiSpecBuilders.requestSpec())
                    .body(java.util.Map.of("email", email, "password", password))
                    .when()
                    .post("/auth/login");
        }
}