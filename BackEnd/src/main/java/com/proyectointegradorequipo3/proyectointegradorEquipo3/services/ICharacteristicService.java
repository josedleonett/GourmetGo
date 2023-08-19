package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CharacteristicCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CharacteristicUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.CharacteristicDto;

import java.util.List;

public interface ICharacteristicService {
    List<CharacteristicDto> searchAllCharacteristic();

    CharacteristicDto searchCharacteristicById(Long id);

    CharacteristicDto searchCharacteristicByName(String name);

    Long saveCharacteristic(CharacteristicCreateRequest request);

    void deleteCharacteristicById(Long id);

    void modifyCharacteristic(Long id, CharacteristicUpdateRequest request) throws Exception;
}
