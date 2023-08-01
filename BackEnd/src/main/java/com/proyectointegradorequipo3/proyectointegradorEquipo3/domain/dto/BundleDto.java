package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BundleDto {
    private String name;
    private int numberDiners;
    private String bundleImage;
    private List<String> galleryImages;

    private Long starter;
    private Long mainCourse;
    private Long desserts;
    private List<Long> drinks;
}
