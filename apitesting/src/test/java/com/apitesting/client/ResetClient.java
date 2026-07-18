package com.apitesting.client;

import com.apitesting.data.secrets.Secrets;
import com.apitesting.support.builders.ApiSpecBuilders;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class ResetClient {

    private static final String DEFAULT_EMP_ID = Secrets.get("MUHAMMED_EMP_ID");

    public Response resetMyBookings(String token) {
        return resetBookingsForEmp(token, DEFAULT_EMP_ID);
    }

    public Response resetBookingsForEmp(String token, String empId) {
        return given()
                .spec(ApiSpecBuilders.authSpec(token))
                .queryParam("emp", empId)
                .when()
                .post("/reset");
    }
}