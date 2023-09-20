package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Booking {
    @Id
    @Column(name = "booking_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "bundle_id")
    private Bundle bundle;

    private LocalDate date;

    private Integer diners;

    private Double price;

    @ManyToMany
    @JoinTable(
            name = "booking_drink",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "drink_quantity_id")
    )
    private List<DrinkQuantity> drinks = new ArrayList<>();

    private Long review;

}
