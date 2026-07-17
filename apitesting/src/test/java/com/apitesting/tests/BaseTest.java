package com.apitesting.tests;

import com.apitesting.client.AuthClient;
import com.apitesting.client.ProductClient;
import com.apitesting.data.builder.CustomerBuilder;
import com.apitesting.support.Report;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BaseTest {

    protected AuthClient authClient;
    protected ProductClient productClient;
    protected String authToken;

    @BeforeEach
    void setUp() {

        Report.step("Starting API test setup");

        Report.info("Action", "Initializing API clients");
        authClient = new AuthClient();
        productClient = new ProductClient();

        Report.info("Action", "Logging in as test customer");

        authToken = CustomerBuilder
                .aCustomer()
                .named("alice")
                .loginAndGetToken();

        if (authToken != null && !authToken.isBlank()) {
            Report.pass("Customer authentication successful");
        } else {
            Report.fail("Customer authentication failed");
            throw new IllegalStateException(
                    "Authentication failed: Token is null or empty"
            );
        }

        Report.pass("API test setup completed");
    }

    @Test
    public void searchProduct(){
       Response product= productClient.search("Bag");
       product.then().statusCode(200);
    }
}