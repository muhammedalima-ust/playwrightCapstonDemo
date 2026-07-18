package com.apitesting.data.builder;

import com.apitesting.data.model.Bus;

public class BusBuilder {
    private String id = "BUS-BLRHYD-3";
    private String operator = "VRL";
    private String operatorName = "VRL Travels";
    private String kind = "sleeper";
    private String origin = "BLR";
    private String dest = "HYD";
    private String depTime = "20:30";
    private String arrTime = "07:45";
    private int baseFarePaise = 129000;
    private int taxPaise = 6450;
    private int farePaise = 135450;
    private int seatsLeft = 22;

    private BusBuilder() {}

    public static BusBuilder aBus() {
        return new BusBuilder();
    }

    public BusBuilder id(String id) {
        this.id = id;
        return this;
    }

    public BusBuilder operator(String operator) {
        this.operator = operator;
        return this;
    }

    public BusBuilder origin(String origin) {
        this.origin = origin;
        return this;
    }

    public BusBuilder dest(String dest) {
        this.dest = dest;
        return this;
    }

    public Bus build() {
        return new Bus(
                id,operator,operatorName,kind,origin,dest,depTime,arrTime,baseFarePaise,taxPaise,farePaise,seatsLeft
        );
    }
}
