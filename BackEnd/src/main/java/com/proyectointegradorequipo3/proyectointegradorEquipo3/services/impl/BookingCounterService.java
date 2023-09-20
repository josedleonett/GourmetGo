package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;


@Component
@RequiredArgsConstructor
public class BookingCounterService {
    private final IBookingRepository bookingRepository;
    private static final int MAX_BOOKINGS = 20;


    public boolean canBook(LocalDate date) {
        if (date.isBefore(LocalDate.now())) {
            throw new RuntimeException("The date must be equal to or later than today's date");
        }
        long bookings = bookingRepository.countByDate(date);
        return bookings < MAX_BOOKINGS;
    }

    public long getCurrentCount(LocalDate date) {
        return bookingRepository.countByDate(date);
    }


}
