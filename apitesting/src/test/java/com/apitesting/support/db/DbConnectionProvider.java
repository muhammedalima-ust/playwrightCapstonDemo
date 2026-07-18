package com.apitesting.support.db;

import com.apitesting.config.Config;
import com.apitesting.data.model.BookingRepository;
import com.apitesting.data.secrets.Secrets;
import org.flywaydb.core.Flyway;
import org.testcontainers.containers.MySQLContainer;

public final class DbConnectionProvider {

    private static final boolean CI_MODE = "true".equalsIgnoreCase(System.getenv("CI"));

    private static MySQLContainer<?> mysqlContainer;

    private DbConnectionProvider() {
    }

    public static synchronized BookingRepository getRepository() {
        String jdbcUrl;
        String username;
        String password;

        if (CI_MODE) {
            if (mysqlContainer == null || !mysqlContainer.isRunning()) {
                mysqlContainer = new MySQLContainer<>("mysql:8.0.33")
                        .withDatabaseName("booking")
                        .withUsername(Secrets.get("MUHAMMED_DB_USERNAME"))
                        .withPassword(Secrets.get("MUHAMMED_DB_PASSWORD"));
                mysqlContainer.start();
            }
            jdbcUrl = mysqlContainer.getJdbcUrl();
            username = mysqlContainer.getUsername();
            password = mysqlContainer.getPassword();
        } else {
            try {
                jdbcUrl = resolveSetting("MUHAMMED_DB_JDBC_URL", Config.DB_JDBC_URL());
                username = resolveSetting("MUHAMMED_DB_USERNAME", Config.DB_USERNAME());
                password = resolveSetting("MUHAMMED_DB_PASSWORD", Config.DB_PASSWORD());
            } catch (IllegalArgumentException ex) {
                throw new IllegalStateException(
                        "CI NOT SET",
                        ex
                );
            }
        }

        Flyway.configure()
                .dataSource(jdbcUrl, username, password)
                .locations("classpath:db/migration")
                .load()
                .migrate();

        return new BookingRepository(jdbcUrl, username, password);
    }

    private static String resolveSetting(String key, String configValue) {
        if (!configValue.isBlank()) {
            return configValue;
        }
        try {
            return Secrets.get(key);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(
                    "Set DB Credentials", ex
            );
        }
    }
}