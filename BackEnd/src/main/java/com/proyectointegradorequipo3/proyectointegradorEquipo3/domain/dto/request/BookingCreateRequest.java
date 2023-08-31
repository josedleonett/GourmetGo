package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingCreateRequest {

    private Long user;

    private Long bundle;

    private LocalDate date;

    private Integer drinks;

    private Integer diners;

    private Double price;
}
