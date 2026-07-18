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
        String email = name + "@tripstack.test";
        String password = Secrets.get("MUHAMMED_"+name + "_PASSWORD");
        return new Customer(name,email,password);
    }
}