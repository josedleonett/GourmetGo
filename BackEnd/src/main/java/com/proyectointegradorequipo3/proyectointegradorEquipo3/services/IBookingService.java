package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BookingCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BookingUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BookingDto;

import java.util.List;

public interface IBookingService {

    List<BookingDto> searchAllBooking();

    BookingDto searchBookingById(Long id);

    Long saveBooking(BookingCreateRequest request);

    void deleteBookingById(Long id) throws Exception;

    void modifyBooking(Long id, BookingUpdateRequest request) throws Exception;
}
