package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plate;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.PlateNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IPlateRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IPlateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class PlateServiceImpl implements IPlateService {

    private static final String NAME = "Plate";
    private final IPlateRepository plateRepository;

    Logger logger = Logger.getLogger(PlateServiceImpl.class.getName());

    //===================Find===================//

    @Override
    @Transactional(readOnly = true)
    public List<Plate> searchAllPlate() {
        return plateRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Plate searchPlateById(Long id) {
        return plateRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(NAME, id));
    }

    @Override
    @Transactional(readOnly = true)
    public Plate searchPlateByName(String name) {
        Optional<Plate> optionalPlate = plateRepository.findByName(name);
        return optionalPlate.orElseThrow(() -> new PlateNotFoundException("Plate with name '" + name + "' not found"));
    }

    //===================Create===================//
    @Override
    public Long savePlate(Plate newPlate) {
        existsName(newPlate.getName());
        save(newPlate);
        return newPlate.getId();
    }

    public void save(Plate plate) {
        plateRepository.save(plate);
    }


    //===================Update===================//

    @Override
    @Transactional
    public void modifyPlate(Long id, Plate request) {
        Plate plate = searchPlateById(id);
        plate.setName(request.getName());
        plate.setType(request.getType());
        plate.setDescription(request.getDescription());
        plate.setImage(request.getImage());
        save(plate);
    }

    //===================Delete===================//

    @Override
    public void deletePlateById(Long id) {
        Plate plate = searchPlateById(id);
        plateRepository.delete(plate);
    }


    //===================Util===================//
    private void existsName(String name) {
        if (plateRepository.existsByName(name)) throw new ExistNameException(name);
    }

    public List<Plate> validateAndGetPlates(List<String> plateNames, String plateType) {
        List<Plate> plates = new ArrayList<>();

        for (String plateName : plateNames) {
            Plate plate = searchPlateByName(plateName);
            if (plate == null) {
                throw new PlateNotFoundException(plateType + " not found: " + plateName);
            }
            plates.add(plate);
        }

        return plates;
    }

}