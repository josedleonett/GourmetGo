package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingUpdateRequest {
    private Long user;

    private Long bundle;

    private LocalDateTime date;

    private List<Long> drinks;

    private Integer diners;

    private Double price;
}
