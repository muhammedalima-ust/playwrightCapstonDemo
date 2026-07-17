package com.apitesting.data.builder;

import com.apitesting.client.AuthClient;
import com.apitesting.data.model.Customer;
import com.apitesting.data.secrets.*;

/** Get the customer details and return the token */
public class CustomerBuilder {
    private String name;

    public static CustomerBuilder aCustomer() {
        return new CustomerBuilder();
    }

    public CustomerBuilder named(String name) {
        this.name = name;
        return this;
    }

    public Customer build(){
        String email = name + "@shopkart.test";
        String password = Secrets.get("SHOPKART_"+name + "_PASSWORD");
        return new Customer(name,email,password);
    }

    public String loginAndGetToken() {
        Customer customer = CustomerBuilder.aCustomer().named(name).build();
        return new AuthClient().login(customer.email(), customer.password()).jsonPath().getString("token");
    }
}