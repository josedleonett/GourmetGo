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
    private int numberDiners;
    private String bundleImage;
    @ElementCollection
    @CollectionTable(name = "gallery")
    @Column(name = "images")
    private List<String> galleryImages;

    @OneToOne
    @JoinColumn(name = "starter_id")
    private Plate starter;

    @OneToOne
    @JoinColumn(name = "main_course_id")
    private Plate mainCourse;

    @OneToOne
    @JoinColumn(name = "desserts_id")
    private Plate desserts;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "bundle_drink",
            joinColumns = @JoinColumn(name = "bundle_id"),
            inverseJoinColumns = @JoinColumn(name = "drink_id")
    )
    private List<Drink> drinks;

}
