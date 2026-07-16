plugins {
    id("java")
}

group = "com.apitesting"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}
val dotenvVersion = "4.45.0"

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    implementation("io.github.cdimascio:java-dotenv:$dotenvVersion")
}

tasks.test {
    useJUnitPlatform()
}




plugins {
    java
    id("io.qameta.allure") version "2.12.0"
}

val seleniumVersion = "4.45.0"
val selenideVersion = "7.16.2"
val junitVersion = "5.14.4"
val cucumberVersion = "7.34.3"
val allureVersion = "2.35.3"
val extentVersion = "5.1.2"
val extentCucumberAdapterVersion = "1.14.0"
val slf4jVersion = "2.0.17"
val testcontainers = "2.0.5"
val flywayVersion = "10.22.0"
val mysqlLibVersion = "8.0.33"
val logBackVersion = "1.5.18"
val restassuredVersion = "6.0.0"

java {
    sourceCompatibility = JavaVersion.VERSION_22
    targetCompatibility = JavaVersion.VERSION_22
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:$junitVersion"))
    testImplementation(platform("io.cucumber:cucumber-bom:$cucumberVersion"))
    testImplementation(platform("io.qameta.allure:allure-bom:$allureVersion"))
    testImplementation(platform("org.testcontainers:testcontainers-bom:$testcontainers"))
    testImplementation("org.seleniumhq.selenium:selenium-java:$seleniumVersion")
    testImplementation("com.codeborne:selenide:$selenideVersion")
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("io.cucumber:cucumber-java")
    testImplementation("io.cucumber:cucumber-junit-platform-engine")
    testImplementation("io.cucumber:cucumber-picocontainer")
    testImplementation("org.junit.platform:junit-platform-suite")
    testImplementation("io.qameta.allure:allure-cucumber7-jvm")
    testImplementation("io.qameta.allure:allure-junit5")
    testImplementation("com.aventstack:extentreports:$extentVersion")
    testImplementation("tech.grasshopper:extentreports-cucumber7-adapter:$extentCucumberAdapterVersion")
    testImplementation("org.slf4j:slf4j-api:$slf4jVersion")
    testImplementation("org.testcontainers:testcontainers-junit-jupiter:$testcontainers")
    testImplementation("org.testcontainers:testcontainers-mysql:$testcontainers")
    testImplementation("org.flywaydb:flyway-core:$flywayVersion")
    testImplementation("org.flywaydb:flyway-mysql:$flywayVersion")
    testImplementation("mysql:mysql-connector-java:$mysqlLibVersion")
    testRuntimeOnly("ch.qos.logback:logback-classic:$logBackVersion")
    testImplementation("io.rest-assured:rest-assured:$restassuredVersion")
}

tasks.withType<JavaCompile>().configureEach {
    options.encoding = "UTF-8"
    options.release.set(22)
}

tasks.withType<Test>().configureEach {
    useJUnitPlatform()
    systemProperty("baseUrl", providers.gradleProperty("baseUrl").orElse("http://localhost:8000").get())
    systemProperty("headless", providers.gradleProperty("headless").orElse("true").get())
    systemProperty("browser", providers.gradleProperty("browser").orElse("chrome").get())
    systemProperty("build.label", providers.gradleProperty("buildLabel").orElse("gradle-local").get())
    systemProperty("cucumber.publish.quiet", "true")
    testLogging {
        events("passed", "skipped", "failed")
        exceptionFormat = org.gradle.api.tasks.testing.logging.TestExceptionFormat.SHORT
    }
}

tasks.test {
    description = "Run the Tests"
    useJUnitPlatform()
    include("**/SyntaxCheckTest.class")
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