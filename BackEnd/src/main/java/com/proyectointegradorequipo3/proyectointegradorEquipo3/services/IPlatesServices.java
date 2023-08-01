package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.PlatesDto;

import java.util.List;
import java.util.Optional;

public interface IPlatesServices {
    List<PlatesDto> searchAllPlates();

    Optional<PlatesDto> searchPlatesById(Long id);

    PlatesDto savePlates(PlatesDto newPlates);

    void deletePlatesById(Long id);

    PlatesDto modifyPlates(PlatesDto platesDTO);
}
