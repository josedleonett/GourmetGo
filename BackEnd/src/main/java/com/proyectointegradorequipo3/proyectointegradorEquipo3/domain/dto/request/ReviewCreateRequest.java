package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewCreateRequest {
    private Long userId;
    private String name;
    private Long bundleId;
    private LocalDate date;
    private double rating;
    private String title;
    private String body;
}
