package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Long id;

    private Long user;

    private Long bundle;

    private String bundleName;

    private LocalDate date;

    private List<Long> drinks;

    private Integer diners;

    private Double price;

    private String comment;
}
