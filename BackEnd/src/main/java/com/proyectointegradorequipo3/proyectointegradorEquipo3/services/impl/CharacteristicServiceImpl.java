package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Characteristic;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CharacteristicCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CharacteristicUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.CharacteristicDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.CharacteristicNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICharacteristicRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.ICharacteristicService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;

import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CharacteristicServiceImpl implements ICharacteristicService {

    private static final String NAME = "Characteristic";
    private final ICharacteristicRepository characteristicRepository;

    private final IBundleRepository bundleRepository;
    private final ModelMapper mapper;

    //===================Find===================//
    @Override
    @Cacheable(value = "characteristics", unless = "#result == null")
    public List<CharacteristicDto> searchAllCharacteristic() {
        return characteristicRepository.findAll().stream()
                .map(characteristic -> mapper.map(characteristic, CharacteristicDto.class))
                .collect(Collectors.toList());
    }

    @Override
    @Cacheable(value = "characteristicById", unless = "#result == null")
    public CharacteristicDto searchCharacteristicById(Long id) {
        Characteristic characteristic = characteristicRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        return characteristic != null ? mapper.map(characteristic, CharacteristicDto.class) : null;
    }

    @Override
    @Cacheable(value = "characteristicByName", unless = "#result == null")
    public CharacteristicDto searchCharacteristicByName(String name) {
        Optional<Characteristic> optionalCharacteristic = characteristicRepository.findByName(name);
        if (optionalCharacteristic.isPresent()) {
            return mapper.map(optionalCharacteristic.get(), CharacteristicDto.class);
        }else {
            throw new CharacteristicNotFoundException("Characteristic with name '" + name + "' not found");
        }
    }

    //===================Create===================//

    @Override
    @Transactional
    public Long saveCharacteristic(CharacteristicCreateRequest request) {
        Characteristic characteristic = mapper.map(request, Characteristic.class);
        existsName(characteristic.getName());
        characteristicRepository.save(characteristic);
        return characteristic.getId();
    }

    //===================Delete===================//

    @Override
    @Transactional
    public void deleteCharacteristicById(Long id) {
        characteristicRepository.deleteById(id);
    }

    //===================Update===================//

    @Override
    @Transactional
    public void modifyCharacteristic(Long id, CharacteristicUpdateRequest request) {
        Optional<Characteristic> optionalCharacteristic = characteristicRepository.findById(id);

        if (optionalCharacteristic.isPresent()) {
            Characteristic characteristic = optionalCharacteristic.get();

            if (request.getName() != null) {
                characteristic.setName(request.getName());
            }

            characteristicRepository.save(characteristic);
        }
    }

    //===================Util===================//
    private void existsName(String name) {
        if (characteristicRepository.existsByName(name)) throw new ExistNameException(name);
    }

    @Cacheable(value = "bundleIdByCharacteristicId", unless = "#result == null")
    public List<Long> getBundleIdsByCharacteristicId(Long characteristicId) {
        return bundleRepository.findAllBundlesByCharacteristicId(characteristicId)
                .stream()
                .map(Bundle::getId)
                .collect(Collectors.toList());
    }

}
