package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain;

import jakarta.persistence.Entity;

import java.util.List;

@Entity
public class Bundles {
    Long id;
    String name;
    int numberDiners;
    String bundleImage;
    List galleryImages;

    Plates starter;
    Plates mainCourse;
    Plates desserts;
    List<Drinks> drinks;

}
