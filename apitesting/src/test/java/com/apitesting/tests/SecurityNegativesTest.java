package com.apitesting.tests;

import com.apitesting.client.AuthClient;
import com.apitesting.client.BookingClient;
import com.apitesting.client.BusClient;
import com.apitesting.client.ResetClient;
import com.apitesting.data.builder.CustomerBuilder;
import com.apitesting.data.model.Bus;
import com.apitesting.data.model.Customer;
import com.apitesting.data.testUser;
import com.apitesting.support.Report;
import io.restassured.response.Response;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

public class SecurityNegativesTest {

    private final AuthClient authClient = new AuthClient();
    private final BusClient busClient = new BusClient();
    private final BookingClient bookingClient = new BookingClient();
    private final ResetClient resetClient = new ResetClient();

    private String victorToken;
    private String bookingId;
    private String pnr;

    @BeforeEach
    void setUp() {
        Customer victor = CustomerBuilder.aCustomer().named(testUser.user1Name()).build();
        Report.step("Logging in as " + victor.name());

        Response login = authClient.login(victor.email(), victor.password());
        login.then().statusCode(200);
        victorToken = login.jsonPath().getString("token");

        Response busResponse = busClient.get();
        Bus bus = busResponse.jsonPath().getObject("buses[0]", Bus.class);
        Response seatResponse = busClient.getSeat(bus.id());
        String seatId = seatResponse.jsonPath().getString("decks.lower[0].seatId");
        if (seatId == null || seatId.isBlank()) {
            seatId = seatResponse.jsonPath().getString("decks.upper[0].seatId");
        }

        Response booking = bookingClient.createBooking(victorToken, java.util.Map.of(
                "journeyType", "bus",
                "inventoryId", bus.id(),
                "seatIds", java.util.List.of(seatId),
                "refundable", true,
                "holdTtlSec", 300
        ));
        bookingId = booking.jsonPath().getString("id");

        bookingClient.payBooking(victorToken, bookingId);
        Response confirm = bookingClient.confirmBooking(victorToken, bookingId);
        pnr = confirm.jsonPath().getString("pnr");
        Report.pass("Booking confirmed for security-test setup, pnr=" + pnr);
    }

    @AfterEach
    void tearDown() {
        resetClient.resetMyBookings(victorToken);
    }

    @Test
    @DisplayName("BOLA: another employee cannot read victor's PNR")
    void bola_crossNamespaceReadBlocked() {
        Customer user2 = CustomerBuilder.aCustomer().named(testUser.user2Name()).build();
        Response user2Login = authClient.login(user2.email(), user2.password());
        user2Login.then().statusCode(200);
        String user2Token = user2Login.jsonPath().getString("token");

        Response response = bookingClient.getBookingByPnr(user2Token, pnr);
        response.then().statusCode(403);
        assertEquals("CROSS_NAMESPACE", response.jsonPath().getString("error"));
        Report.pass("BOLA correctly blocked with 403 CROSS_NAMESPACE");
    }

    @Test
    @DisplayName("Cross-namespace cancel is blocked")
    void crossNamespace_cancelBlocked() {
        Customer user2 = CustomerBuilder.aCustomer().named(testUser.user2Name()).build();
        Response user2Login = authClient.login(user2.email(), user2.password());
        String user2Token = user2Login.jsonPath().getString("token");

        Response response = bookingClient.cancelBooking(user2Token, bookingId);
        response.then().statusCode(403);
        assertEquals("CROSS_NAMESPACE", response.jsonPath().getString("error"));
        Report.pass("Cross-namespace cancel correctly blocked");
    }

    @Test
    @DisplayName("Tampered token is rejected on /auth/me")
    void tamperedToken_unauthorized() {
        String tampered = victorToken.substring(0, victorToken.length() - 5) + "abcde";
        Response response = authClient.me(tampered);
        response.then().statusCode(401);
        Report.pass("Tampered token correctly rejected with 401");
    }

    @Test
    @DisplayName("Missing token is rejected on GET /bookings")
    void noToken_unauthorized() {
        Response response = bookingClient.getBookings(null);
        
        response.then().statusCode(401);
        Report.pass("Missing/invalid token correctly rejected with 401");
    }
}