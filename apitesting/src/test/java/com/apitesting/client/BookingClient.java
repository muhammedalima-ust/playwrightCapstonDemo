package com.apitesting.client;

import com.apitesting.support.builders.ApiSpecBuilders;
import io.restassured.response.Response;

import java.util.Map;

import static io.restassured.RestAssured.given;

public class BookingClient {

    public Response createBooking(String token, Map<String, ?> bookingRequest) {
        return given()
                .spec(ApiSpecBuilders.authSpec(token))
                .body(bookingRequest)
                .when()
                .post("/bookings");
    }

    public Response payBooking(String token, String bookingId) {
        return given()
                .spec(ApiSpecBuilders.authSpec(token))
                .body(Map.of())
                .pathParam("id", bookingId)
                .when()
                .post("/bookings/{id}/pay");
    }

    public Response confirmBooking(String token, String bookingId) {
        return given()
                .spec(ApiSpecBuilders.authSpec(token))
                .pathParam("id", bookingId)
                .when()
                .post("/bookings/{id}/confirm");
    }

    public Response cancelBooking(String token, String bookingId) {
        return given()
                .spec(ApiSpecBuilders.authSpec(token))
                .pathParam("id", bookingId)
                .when()
                .post("/bookings/{id}/cancel");
    }

    public Response getBookings(String token) {
        return given()
                .spec(ApiSpecBuilders.authSpec(token))
                .when()
                .get("/bookings");
    }

    public Response getBookingByPnr(String token, String pnr) {
        return given()
                .spec(ApiSpecBuilders.authSpec(token))
                .pathParam("pnr", pnr)
                .when()
                .get("/bookings/{pnr}");
    }
}