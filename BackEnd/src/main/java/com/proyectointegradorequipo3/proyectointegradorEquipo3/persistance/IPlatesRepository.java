package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plates;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPlatesRepository extends JpaRepository<Plates, Long> {

}
