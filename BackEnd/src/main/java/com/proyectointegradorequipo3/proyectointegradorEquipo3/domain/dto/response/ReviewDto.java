package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Long id;
    private Long userId;
    private String name;
    private Long bundle;
    private LocalDate date;
    private double rating;
    private String title;
    private String body;
}
