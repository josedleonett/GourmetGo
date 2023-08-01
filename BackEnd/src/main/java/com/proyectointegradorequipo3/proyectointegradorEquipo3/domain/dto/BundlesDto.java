package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drinks;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plates;

import java.util.List;

public class BundlesDto {
    String name;
    int numberDiners;
    String bundleImage;
    List galleryImages;

    Plates starter;
    Plates mainCourse;
    Plates desserts;
    List<Drinks> drinks;
}
