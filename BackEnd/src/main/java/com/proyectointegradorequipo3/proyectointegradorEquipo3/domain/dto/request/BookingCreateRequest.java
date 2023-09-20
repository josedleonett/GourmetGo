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
public class BookingCreateRequest {

    private Long user;

    private Long bundle;

    private LocalDateTime date;

    private List<DrinkQuantity> drinks;

    private Integer diners;
}
