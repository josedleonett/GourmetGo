package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.ReviewCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.ReviewDto;

public interface IReviewService {

    ReviewDto searchReviewDtoById(Long id);

    void modifyReview(Long id, ReviewCreateRequest request);

    void deleteReviewById(Long id);

    Long saveReview(ReviewCreateRequest request) throws Exception;

}
