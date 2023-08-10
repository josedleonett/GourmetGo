package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Plate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String description;
    private String image;

    @ManyToMany(mappedBy = "starter")
    private List<Bundle> bundlesAsStarter;

    @ManyToMany(mappedBy = "mainCourse")
    private List<Bundle> bundlesAsMainCourse;

    @ManyToMany(mappedBy = "desserts")
    private List<Bundle> bundlesAsDesserts;
}
