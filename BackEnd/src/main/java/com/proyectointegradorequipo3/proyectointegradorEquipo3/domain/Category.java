package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String img;

}
