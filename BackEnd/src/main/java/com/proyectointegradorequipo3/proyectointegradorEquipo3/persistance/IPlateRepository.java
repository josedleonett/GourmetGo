package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IPlateRepository extends JpaRepository<Plate, Long> {

    boolean existsByName(String name);

    @Query("SELECT p FROM Plate p WHERE p.name = :name")
    Optional<Plate> findByName(String name);
}
