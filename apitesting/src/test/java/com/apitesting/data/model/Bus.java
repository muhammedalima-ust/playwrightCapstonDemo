package com.apitesting.data.model;

public record Bus(
    String id,
    String operator,
    String operatorName,
    String kind,
    String origin,
    String dest,
    String depTime,
    String arrTime,
    int baseFarePaise,
    int taxPaise,
    int farePaise,
    int seatsLeft
) {
}