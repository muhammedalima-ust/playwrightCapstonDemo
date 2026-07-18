CREATE TABLE bookings (
    id VARCHAR(36) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    pnr VARCHAR(20),
    emp_id VARCHAR(20) NOT NULL
);