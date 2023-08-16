package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends JpaRepository<RoleEntity, Long> {
}
