package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlateDto {
    private Long id;
    private String name;
    private String type;
    private String description;
    private String image;
    private double price;
}
