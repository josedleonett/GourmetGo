package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Booking;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BookingCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BookingDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.DateDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.BookingServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.BOOKING_URI;


@RestController
@RequestMapping(BOOKING_URI)
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class BookingController {

    private final BookingServiceImpl bookingService;

    //====================Create====================//
    @PostMapping(path = "/create")
    public ResponseEntity<Void> createBooking(@Valid @RequestBody BookingCreateRequest request) {
        long id = bookingService.saveBooking(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).build();
    }

    //====================Display all====================//
    @GetMapping
    public ResponseEntity<List<BookingDto>> getAllBooking() {
        List<BookingDto> list = bookingService.searchAllBooking();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //====================Display after today====================//
    @GetMapping("/dates")
    public ResponseEntity<Set<DateDto>> getBookingDatesAfterToday() {
        Set<DateDto> dates = bookingService.getBookingDatesAfterToday();
        return ResponseEntity.ok(dates);
    }



    //====================Display between date====================//
    @GetMapping("/betweenDate")
    public ResponseEntity<List<Booking>> getBookingBetweenDate(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        List<Booking> list = bookingService.getBookingBetweenDate(start, end);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //====================Delete====================//
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBookingById(id);
        return ResponseEntity.noContent().build();
    }
}
