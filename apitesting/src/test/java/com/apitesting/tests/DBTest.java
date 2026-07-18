package com.apitesting.tests;

import com.apitesting.data.model.BookingRepository;
import com.apitesting.data.secrets.Secrets;
import com.apitesting.support.Report;
import com.apitesting.support.db.DbConnectionProvider;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class DBTest {

    @Test
    void checkEMPCheckBus() {
        Report.step("Open DB repository and reset test data");

        BookingRepository repository = DbConnectionProvider.getRepository();
        repository.resetMutableTables();

        String empId = Secrets.get("MUHAMMED_EMP_ID");
        Report.info("empId", empId);

        String bookingId = "TS-" + empId + "-0001";
        BookingRepository.BookingData booking = new BookingRepository.BookingData(
                bookingId,
                "Testing USER",
                "HOLD",
                bookingId,
                empId
        );

        Report.step("Save one booking row and read it back");
        repository.save(booking);
        BookingRepository.BookingData savedBooking = repository.findById(bookingId);

        assertNotNull(savedBooking, "The Booking Is persitant the DB");
        assertEquals(empId, savedBooking.empId(), "emp_id should be there in teh db");
    }
}
