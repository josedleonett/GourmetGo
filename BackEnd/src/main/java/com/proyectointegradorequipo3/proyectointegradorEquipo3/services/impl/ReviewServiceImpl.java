package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Booking;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.DrinkQuantity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Review;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.ReviewCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.ReviewDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.UserDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ReviewNotAllowedException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBookingRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IReviewRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IReviewService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements IReviewService {

    private static final String NAME = "Review";
    private final IReviewRepository reviewRepository;
    private final UserServiceImpl userService;
    private final BundleServiceImpl bundleService;

    private final IBookingRepository bookingRepository;

    private final ModelMapper mapper;

    //===================Create===================//
    @Override
    @Transactional
    public Long saveReview(ReviewCreateRequest request) throws Exception {
        List<Booking> bookings = bookingRepository.findByUserId(request.getUserId());

        boolean containsBooking = bookings.stream()
                .anyMatch(booking -> booking.getBundle().getId().equals(request.getBundleId()));

        if (containsBooking) {
            System.out.println("El usuario tiene reserva y puede comentar");
            int MAX_BODY_LENGTH = 2000;
            if (request.getBody().length() > MAX_BODY_LENGTH) {
                throw new Exception("Body is too long!");
            }

            UserDto user = userService.searchUserById(request.getUserId());
            BundleDto bundle = bundleService.searchBundleDtoById(request.getBundleId());

            if (user == null || bundle == null) {
                throw new Exception("User or bundle not found");
            }

            Review review = new Review();
            review.setUserId(request.getUserId());
            review.setName(request.getName());
            review.setBundleId(request.getBundleId());
            review.setDate(request.getDate());
            review.setRating(request.getRating());
            review.setTitle(request.getTitle());
            review.setBody(request.getBody());
            review = reviewRepository.save(review);

            return review.getId();
        } else {
            throw new ReviewNotAllowedException("Error leaving review");
        }
    }

    //===================Find===================//
    public List<ReviewDto> getAllReviewsByBundleId(Long bundleId) {
        List<Review> reviews = reviewRepository.findByBundleId(bundleId);
        return reviews.stream()
                .map(review -> mapper.map(review, ReviewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ReviewDto searchReviewDtoById(Long id) {
        return null;
    }

    //===================Update===================//
    @Override
    public void modifyReview(Long id, ReviewCreateRequest request) {

    }

    //===================Delete===================//
    @Override
    public void deleteReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        reviewRepository.delete(review);
    }

}
