package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;

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
    private Long id;
    private String name;
    private String description;
    private int numberDiners;
    private String bundleImage;
    private List<String> galleryImages;

    private Plate starter;
    private Plate mainCourse;
    private Plate desserts;
    private List<Drink> drinks;
}
