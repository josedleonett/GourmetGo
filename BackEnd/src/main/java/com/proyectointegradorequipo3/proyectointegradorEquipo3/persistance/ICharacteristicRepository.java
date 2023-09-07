package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Characteristic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICharacteristicRepository extends JpaRepository<Characteristic, Long> {
    boolean existsByName(String name);

    @Query("SELECT c FROM Characteristic c WHERE c.name = :name")
    Optional<Characteristic> findByName(String name);

    List<Characteristic> findByNameIn(List<String> names);
}
