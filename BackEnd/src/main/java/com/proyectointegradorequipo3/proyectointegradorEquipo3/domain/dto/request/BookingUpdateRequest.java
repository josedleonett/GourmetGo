package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.DrinkQuantity;
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

    private LocalDate date;

    private List<DrinkQuantity> drinks;

    private Integer diners;

    private Double price;

    private String comment;
}
