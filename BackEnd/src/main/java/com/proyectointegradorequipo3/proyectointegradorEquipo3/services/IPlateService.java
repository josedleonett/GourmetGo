package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.PlateCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.PlateUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.PlateDto;

import java.util.List;

public interface IPlateService {
    List<PlateDto> searchAllPlate();

    PlateDto searchPlateById(Long id);

    PlateDto searchPlateByName(String name);

    Long savePlate(PlateCreateRequest request);

    void deletePlateById(Long id) throws Exception;

    void modifyPlate(Long id, PlateUpdateRequest plate) throws Exception;
}
