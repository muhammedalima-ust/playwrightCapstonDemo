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