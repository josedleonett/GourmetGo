package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Drinks {
    Long id;
    String name;
    String image;
    int price;
    int amount;
    
}
