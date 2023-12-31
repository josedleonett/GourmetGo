package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Category;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Characteristic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByName(String name);

    @Query("SELECT c FROM Category c WHERE c.name = :name")
    Optional<Category> findByName(String name);

    List<Category> findByNameIn(List<String> names);


}
