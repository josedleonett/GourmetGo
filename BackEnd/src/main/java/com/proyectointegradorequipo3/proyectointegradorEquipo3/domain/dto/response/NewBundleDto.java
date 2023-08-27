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
public class NewBundleDto {
    private Long id;
    private String name;
    private String description;
    private String image;
    private List<String> galleryImages;
    private List<String> starter;
    private List<String> mainCourse;
    private List<String> desserts;
    private List<String> drinks;
    private List<String> characteristics;
    private List<String> categories;
    private Double rating;
}
