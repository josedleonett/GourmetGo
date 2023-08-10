package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Bundle {

    @Id
    @Column(name = "bundle_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String bundleImage;
    @ElementCollection
    @CollectionTable(name = "gallery")
    @Column(name = "images")
    private List<String> galleryImages;

    @ManyToMany(cascade = CascadeType.DETACH)
    @JoinTable(
            name = "bundle_starter",
            joinColumns = @JoinColumn(name = "bundle_id"),
            inverseJoinColumns = @JoinColumn(name = "starter_id")
    )
    private List<Plate> starter;

    @ManyToMany(cascade = CascadeType.DETACH)
    @JoinTable(
            name = "bundle_main_course",
            joinColumns = @JoinColumn(name = "bundle_id"),
            inverseJoinColumns = @JoinColumn(name = "main_course_id")
    )
    private List<Plate> mainCourse;

    @ManyToMany(cascade = CascadeType.DETACH)
    @JoinTable(
            name = "bundle_desserts",
            joinColumns = @JoinColumn(name = "bundle_id"),
            inverseJoinColumns = @JoinColumn(name = "dessert_id")
    )
    private List<Plate> desserts;

    @ManyToMany(cascade = CascadeType.DETACH)
    @JoinTable(
            name = "bundle_drink",
            joinColumns = @JoinColumn(name = "bundle_id"),
            inverseJoinColumns = @JoinColumn(name = "drink_id")
    )
    private List<Drink> drinks;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "bundle_category",
            joinColumns = @JoinColumn(name = "bundle_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;

    private Double rating;

}
