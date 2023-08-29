package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Category;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BundleForCardDto {
    private Long id;
    private String name;
    private String description;
    private String image;
    private List<String> galleryImages;
    private Double rating;
}
