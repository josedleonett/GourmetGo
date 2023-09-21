package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.ReviewCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.ReviewServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.REVIEW_URI;

@RestController
@RequestMapping(REVIEW_URI)
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class ReviewController {

    private final ReviewServiceImpl reviewService;

    //====================Create====================//
    @PostMapping(path = "/create")
    public ResponseEntity<Void> createReview(@Valid @RequestBody ReviewCreateRequest request) throws Exception {
        long id = reviewService.saveReview(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).build();
    }

    //====================Delete====================//
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReviewById(id);
        return ResponseEntity.noContent().build();
    }
}
