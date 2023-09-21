package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class DrinkQuantity {
    @Id
    @Column(name = "drink_quantity_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long drinkId;
    private Integer quantity;
    @ManyToMany(mappedBy = "drinks")
    private List<Booking> bookings = new ArrayList<>();
}