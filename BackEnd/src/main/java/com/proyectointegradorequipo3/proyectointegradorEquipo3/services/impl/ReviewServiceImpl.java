package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Review;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.ReviewCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.ReviewDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.UserDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IReviewRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IReviewService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements IReviewService {

    private final IReviewRepository reviewRepository;
    private final UserServiceImpl userService;
    private final BundleServiceImpl bundleService;

    private final ModelMapper mapper;

    @Override
    public ReviewDto searchReviewDtoById(Long id) {
        return null;
    }

    @Override
    public void modifyReview(Long id, ReviewCreateRequest request) {

    }

    @Override
    public void deleteReviewById(Long id) {

    }

    @Override
    @Transactional
    public Long saveReview(ReviewCreateRequest request) throws Exception {
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
    }


    public List<ReviewDto> getAllReviewsByBundleId(Long bundleId) {
        List<Review> reviews = reviewRepository.findByBundleId(bundleId);
        return reviews.stream()
                .map(review -> mapper.map(review, ReviewDto.class))
                .collect(Collectors.toList());
    }

}
