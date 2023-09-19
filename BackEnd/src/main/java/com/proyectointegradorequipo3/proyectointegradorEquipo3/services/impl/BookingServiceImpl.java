package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.Mapper.BookingMapper;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.*;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BookingCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BookingUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BookingDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.DateDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.DrinkDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBookingRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IDrinkQuantity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IUserRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IBookingService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
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

    private final IDrinkQuantity drinkQuantityRepository;

    private final DrinkServiceImpl drinkService;

    private final BundleServiceImpl bundleService;

    private final ModelMapper mapper;

    private final BookingMapper bookingMapper;

    private final EmailService emailService;


    //===================Search===================//
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
                .map(booking -> BookingMapper.toDto(booking))
                .collect(Collectors.toList());
        return bookingDtos;
    }


    @Override
    public BookingDto searchBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        return BookingMapper.toDto(booking);
    }


    //===================Create===================//
    @Override
    @Transactional
    public Long saveBooking(BookingCreateRequest request) throws IOException {
        UserEntity user = userRepository.findById(request.getUser())
                .orElseThrow(() -> new ResourceNotFoundException("User", request.getUser()));
        Bundle bundle = bundleRepository.findById(request.getBundle())
                .orElseThrow(() -> new ResourceNotFoundException("Bundle", request.getBundle()));

        BundleDto currentBundle = bundleService.searchBundleDtoById(request.getBundle());
        double dinnersPrice = currentBundle.getPrice() * request.getDiners();

        double drinksPrice = 0.;
        List<DrinkQuantity> persistedDrinks = new ArrayList<>();
        if (!request.getDrinks().isEmpty()) {

            for (DrinkQuantity drink : request.getDrinks()) {
                DrinkDto currentDrink = drinkService.searchDrinkById(drink.getDrinkId());
                drinksPrice += (drink.getQuantity() * currentDrink.getPrice());
                DrinkQuantity persistedDrink = drinkQuantityRepository.save(drink);
                persistedDrinks.add(persistedDrink);
            }
        }

        double totalprice = dinnersPrice + drinksPrice;

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBundle(bundle);
        booking.setDate(request.getDate());
        booking.setDrinks(persistedDrinks);
        booking.setDiners(request.getDiners());
        booking.setPrice(totalprice);

        bookingRepository.save(booking);
        emailService.sendBookingConfirmationEmail(user, booking);
        return booking.getId();
    }

    //===================Delete===================//
    @Override
    @Transactional
    public void deleteBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        bookingRepository.delete(booking);
        for (DrinkQuantity drink : booking.getDrinks()){
            drinkQuantityRepository.deleteById(drink.getId());
        }
    }

    //===================Update===================//
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
