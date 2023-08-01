package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBundleRepository extends JpaRepository<Bundles, Long> {

}
