package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drinks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDrinksRepository extends JpaRepository<Drinks, Long> {
}
