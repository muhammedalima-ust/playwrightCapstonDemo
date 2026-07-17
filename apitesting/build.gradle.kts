import org.gradle.api.tasks.testing.logging.TestExceptionFormat
import org.gradle.api.tasks.testing.logging.TestLogEvent

plugins {
    java
    //id("io.qameta.allure") version "2.12.0"
}

java {
    sourceCompatibility = JavaVersion.VERSION_22
    targetCompatibility = JavaVersion.VERSION_22
}

group = "com.apitesting"
version = "1.0-SNAPSHOT"



val dotenvVersion = "3.2.0"
val junitVersion = "5.14.4"
val cucumberVersion = "7.34.3"
val allureVersion = "2.35.3"
val extentVersion = "5.1.2"
val extentCucumberAdapterVersion = "1.14.0"
val slf4jVersion = "2.0.17"
val testcontainersVersion = "2.0.5"
val flywayVersion = "10.22.0"
val mysqlLibVersion = "8.0.33"
val logBackVersion = "1.5.18"
val restassuredVersion = "6.0.0"

dependencies {

    // BOMs
    testImplementation(platform("org.junit:junit-bom:$junitVersion"))
    testImplementation(platform("io.cucumber:cucumber-bom:$cucumberVersion"))
    testImplementation(platform("io.qameta.allure:allure-bom:$allureVersion"))
    testImplementation(
        platform("org.testcontainers:testcontainers-bom:$testcontainersVersion")
    )

    // JUnit
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("org.junit.platform:junit-platform-suite")

    // Cucumber
    testImplementation("io.cucumber:cucumber-java")
    testImplementation("io.cucumber:cucumber-junit-platform-engine")
    testImplementation("io.cucumber:cucumber-picocontainer")

    // Allure
    testImplementation("io.qameta.allure:allure-cucumber7-jvm")
    testImplementation("io.qameta.allure:allure-junit5")

    // Extent Reports
    testImplementation("com.aventstack:extentreports:$extentVersion")
    testImplementation(
        "tech.grasshopper:extentreports-cucumber7-adapter:$extentCucumberAdapterVersion"
    )

    // Logging
    testImplementation("org.slf4j:slf4j-api:$slf4jVersion")
    testRuntimeOnly("ch.qos.logback:logback-classic:$logBackVersion")

    // Testcontainers
    testImplementation("org.testcontainers:testcontainers-junit-jupiter")
    testImplementation("org.testcontainers:testcontainers-mysql")

    // Flyway
    testImplementation("org.flywaydb:flyway-core:$flywayVersion")
    testImplementation("org.flywaydb:flyway-mysql:$flywayVersion")

    // MySQL
    testImplementation("com.mysql:mysql-connector-j:$mysqlLibVersion")

    // REST Assured
    testImplementation("io.rest-assured:rest-assured:$restassuredVersion")

    // Dotenv
    testImplementation("io.github.cdimascio:dotenv-java:$dotenvVersion")
}

tasks.withType<JavaCompile>().configureEach {
    options.encoding = "UTF-8"
    options.release.set(22)
}

tasks.test {
    description = "Run the Tests"

    useJUnitPlatform()
    include("**/BaseTest.class")

    maxParallelForks = 1

    testLogging {
        events(
            TestLogEvent.PASSED,
            TestLogEvent.FAILED,
            TestLogEvent.SKIPPED,
            TestLogEvent.STANDARD_OUT,
            TestLogEvent.STANDARD_ERROR
        )

        exceptionFormat = TestExceptionFormat.FULL

        showExceptions = true
        showStackTraces = true
        showCauses = true
        showStandardStreams = true
    }
}

tasks.test{
    include("**/BaseTest.class");
}