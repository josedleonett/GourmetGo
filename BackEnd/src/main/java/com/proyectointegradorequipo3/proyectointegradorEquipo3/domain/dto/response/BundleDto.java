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
public class BundleDto {
    private Long id;
    private String name;
    private String description;
    private String bundleImage;
    private List<String> galleryImages;
    private List<PlateDto> starter;
    private List<PlateDto> mainCourse;
    private List<PlateDto> desserts;
    private List<Drink> drinks;
    private List<CharacteristicDto> characteristics;
    private List<Category> categories;
    private Double rating;
}
