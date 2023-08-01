package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plate;

import java.util.List;

public interface IPlateService {
    List<Plate> searchAllPlate();

    Plate searchPlateById(Long id);

    Long savePlate(Plate newPlate);

    void deletePlateById(Long id);

    void modifyPlate(Long id, Plate plate);
}
