package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.Mapper.BookingMapper;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Booking;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.UserEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BookingCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BookingUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BookingDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.DateDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBookingRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IUserRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IBookingService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements IBookingService {

    private static final String NAME = "Booking";
    private final IBookingRepository bookingRepository;

    private final IBundleRepository bundleRepository;

    private final IUserRepository userRepository;
    private final ModelMapper mapper;

    private final BookingMapper bookingMapper;

    public Set<DateDto> getBookingDatesAfterToday() {
        LocalDate today = LocalDate.now();
        List<Booking> bookings = bookingRepository.findByDateAfter(today);
        return bookings.stream()
                .map(booking -> {
                    DateDto dateDto = new DateDto();
                    dateDto.setDate(booking.getDate());
                    return dateDto;
                })
                .collect(Collectors.toSet());
    }

    public List<Booking> getBookingBetweenDate(LocalDate start, LocalDate end) {
        return bookingRepository.findAllByDateBetween(start, end);
    }

    @Override
    public List<BookingDto> searchAllBooking() {
        List<Booking> bookings = bookingRepository.findAll();
        List<BookingDto> bookingDtos = bookings.stream()
                .map(booking -> bookingMapper.toDto(booking))
                .collect(Collectors.toList());
        return bookingDtos;
    }


    @Override
    public BookingDto searchBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        return mapper.map(booking, BookingDto.class);
    }

    @Override
    public Long saveBooking(BookingCreateRequest request) {
        UserEntity user = userRepository.findById(request.getUser())
                .orElseThrow(() -> new ResourceNotFoundException("User", request.getUser()));
        Bundle bundle = bundleRepository.findById(request.getBundle())
                .orElseThrow(() -> new ResourceNotFoundException("Bundle", request.getBundle()));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBundle(bundle);
        booking.setDate(request.getDate());
        booking.setDrinks(request.getDrinks());
        booking.setDiners(request.getDiners());
        booking.setPrice(request.getPrice());

        bookingRepository.save(booking);

        return booking.getId();
    }

    @Override
    public void deleteBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        bookingRepository.delete(booking);
    }

    @Override
    public void modifyBooking(Long id, BookingUpdateRequest request) {
        BookingDto bookingDto = searchBookingById(id);

        if (request.getDate() != null) {
            bookingDto.setDate(request.getDate());
        }

        if (request.getDrinks() != null) {
            bookingDto.setDrinks(request.getDrinks());
        }

        if (request.getDiners() != null) {
            bookingDto.setDiners(request.getDiners());
        }

        if (request.getPrice() != null) {
            bookingDto.setPrice(request.getPrice());
        }

        Booking booking = mapper.map(bookingDto, Booking.class);
        booking.setId(id);
        bookingRepository.save(booking);
    }


}
