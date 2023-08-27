package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface IBundleRepository extends JpaRepository<Bundle, Long> {

    boolean existsByName(String name);

    Bundle findByName(String name);


    @Query("SELECT b FROM Bundle b JOIN b.categories c WHERE c.id = :categoryId")
    List<Bundle> findAllBundlesByCategoryId(Long categoryId);

    @Query("SELECT b FROM Bundle b JOIN b.characteristics c WHERE c.id = :characteristicId")
    List<Bundle> findAllBundlesByCharacteristicId(Long characteristicId);

    @Query("SELECT new map(b.id as id, b.name as name) FROM Bundle b JOIN b.categories c WHERE c.id = :categoryId")
    List<Map<Long, String>> findBundleIdsAndNamesByCategoryId(@Param("categoryId") Long categoryId);

    @Query("SELECT b.id FROM Bundle b")
    List<Long> findAllIds();
}
