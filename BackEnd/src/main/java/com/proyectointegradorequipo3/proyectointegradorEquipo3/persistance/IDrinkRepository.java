package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IDrinkRepository extends JpaRepository<Drink, Long> {

    boolean existsByName(String name);

    @Query("SELECT d FROM Drink d WHERE d.name = :name")
    Optional<Drink> findByName(String name);
}
