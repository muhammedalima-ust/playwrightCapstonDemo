package com.apitesting.tests;

import com.apitesting.client.AuthClient;
import com.apitesting.client.BookingClient;
import com.apitesting.client.BusClient;
import com.apitesting.client.ResetClient;
import com.apitesting.data.builder.CustomerBuilder;
import com.apitesting.data.model.Bus;
import com.apitesting.data.model.Customer;
import com.apitesting.data.secrets.Secrets;
import com.apitesting.data.testUser;
import com.apitesting.support.Report;
import io.restassured.response.Response;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.junit.jupiter.api.Assertions.*;

public class BaseTest {

    protected AuthClient authClient;
    protected BookingClient bookingClient;
    protected BusClient busClient;
    protected ResetClient resetClient;
    protected String authToken;
    protected boolean bookingCreatedForReset;
    protected String bookingResetToken;

    @BeforeEach
    void setUp() {

        Report.step("Starting API test setup");
        
        authClient = new AuthClient();
        bookingClient = new BookingClient();
        busClient = new BusClient();
        resetClient = new ResetClient();
        bookingCreatedForReset = false;
        bookingResetToken = null;
    }

    @AfterEach
    void tearDown() {
        if (!bookingCreatedForReset || bookingResetToken == null || bookingResetToken.isBlank()) {
            return;
        }

        Response resetResponse = resetClient.resetMyBookings(bookingResetToken);
        resetResponse.then().statusCode(200);

        String emp = resetResponse.jsonPath().getString("emp");
        int purged = resetResponse.jsonPath().getInt("purged");
        Report.pass("Reset completed");

        bookingCreatedForReset = false;
        bookingResetToken = null;
    }


    @Test
    @DisplayName("Auth Testing")
    public void authTesting(){
       Report.step("Started the Auth Testing");

        Customer customer = CustomerBuilder
                .aCustomer()
                .named(testUser.user1Name())
            .build();
        Report.pass("Customer builded using Customer Builder");

        Response authResponse = authClient.login(customer.email(), customer.password());

        authResponse.then()
            .statusCode(200)
            .body(matchesJsonSchemaInClasspath("schema/json/authresponse.schema.json"));
        Report.pass("Structure checked");

        authToken = authResponse.jsonPath().getString("token");
        

        assertNotNull(authToken, "Token is NULL");
        assertFalse(authToken.isBlank());

        Report.pass("Customer authentication successful");
    }

    @Test
    @DisplayName("Bus Get testing")
    public void busGet(){
       Report.step("Started the Bus Testing");

        Response busResponse = busClient.get();

        busResponse.then()
            .statusCode(200);
    }

    @Test
    @DisplayName("Bus Seats testing")
    public void busSeats(){
       Report.step("Started the Bus Seats Testing");

       Response busResponse = busClient.get();

        busResponse.then()
            .statusCode(200);

        Bus bus = busResponse.jsonPath()
                .getObject("buses[0]", Bus.class);
        Report.step("First Bus added ");
        Report.step(bus.toString());



        Response seatResponse = busClient.getSeat(bus.id());

        seatResponse.then()
            .body(matchesJsonSchemaInClasspath("schema/json/busseatresponse.schema.json"));

        assertEquals(bus.id(), seatResponse.jsonPath().getString("busId"));
        assertEquals(bus.operator(), seatResponse.jsonPath().getString("operator"));
        assertNotNull(seatResponse.jsonPath().getString("decks.lower.size()"));
        assertNotNull(seatResponse.jsonPath().getString("decks.upper.size()"));
    }

    @Test
    @DisplayName("Booking Flow testing")
    public void bookingFlowTesting() {
        Report.step("Started the Booking Flow Testing");

        Customer customer = CustomerBuilder
                .aCustomer()
                .named(testUser.user1Name())
                .build();

        Response authResponse = authClient.login(customer.email(), customer.password());
        authResponse.then().statusCode(200);

        authToken = authResponse.jsonPath().getString("token");
        String empId = Secrets.get("MUHAMMED_EMP_ID");
        Report.info("empId", empId);

        Response busResponse = busClient.get();
        busResponse.then().statusCode(200);

        Bus bus = busResponse.jsonPath().getObject("buses[0]", Bus.class);

        Response seatResponse = busClient.getSeat(bus.id());

        String seatId = seatResponse.jsonPath().getString("decks.lower[0].seatId");
        if (seatId == null || seatId.isBlank()) {
            seatId = seatResponse.jsonPath().getString("decks.upper[0].seatId");
        }

        Report.step("Create booking for the current namespace");
        Response bookingResponse = bookingClient.createBooking(
                authToken,
                java.util.Map.of(
                        "journeyType", "bus",
                        "inventoryId", bus.id(),
                        "seatIds", java.util.List.of(seatId),
                        "refundable", true,
                        "holdTtlSec", 120
                )
        );

        bookingCreatedForReset = true;
        bookingResetToken = authToken;

        bookingResponse.then().statusCode(201);
        assertEquals("HELD", bookingResponse.jsonPath().getString("state"));
        assertEquals(empId, bookingResponse.jsonPath().getString("empId"));

        String bookingId = bookingResponse.jsonPath().getString("id");
        Report.step("Booking created and moved to pay step");

        Response payResponse = bookingClient.payBooking(authToken, bookingId);
        payResponse.then().statusCode(200);
        assertEquals("PAYMENT_PENDING", payResponse.jsonPath().getString("state"));

        Report.step("Confirm booking check pnr is generated");
        Response confirmResponse = bookingClient.confirmBooking(authToken, bookingId);
        confirmResponse.then().statusCode(200);
        assertEquals("CONFIRMED", confirmResponse.jsonPath().getString("state"));
        assertNotNull(confirmResponse.jsonPath().getString("pnr"));

        Report.step("Cancel booking and verify refund state");
        Response cancelResponse = bookingClient.cancelBooking(authToken, bookingId);
        cancelResponse.then().statusCode(200);
        assertEquals("REFUNDED", cancelResponse.jsonPath().getString("state"));
    }
}