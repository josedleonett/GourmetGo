package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBundleRepository extends JpaRepository<Bundle, Long> {

    boolean existsByName(String name);

    Bundle findByName(String name);


    @Query("SELECT b FROM Bundle b JOIN b.categories c WHERE c.id = :categoryId")
    List<Bundle> findAllBundlesByCategoryId(Long categoryId);

    @Query("SELECT b FROM Bundle b JOIN b.characteristics c WHERE c.id = :characteristicId")
    List<Bundle> findAllBundlesByCharacteristicId(Long characteristicId);
}
