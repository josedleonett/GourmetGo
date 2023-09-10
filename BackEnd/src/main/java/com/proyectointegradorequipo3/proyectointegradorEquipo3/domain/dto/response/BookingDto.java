package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Long id;

    private Long user;

    private Long bundle;

    private LocalDate date;

    private Integer drinks;

    private Integer diners;

    private Double price;
}
