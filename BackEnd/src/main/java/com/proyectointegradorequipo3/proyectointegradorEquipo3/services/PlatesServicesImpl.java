package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.configuration.MapperConfig;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plates;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.PlatesDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IPlatesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

public class PlatesServicesImpl implements IPlatesServices{
    private final IPlatesRepository platesRepository;
    Logger logger = Logger.getLogger(PlatesServicesImpl.class.getName());

    @Autowired
    private ModelMapper modelMapper;

    public PlatesServicesImpl(IPlatesRepository platesRepository) {
        this.platesRepository = platesRepository;
    }


    @Override
    public List<PlatesDto> searchAllPlates() {

        List<Plates> platesList = platesRepository.findAll();

        List<PlatesDto> platesDTOList = MapperConfig.mapAll(platesList, PlatesDto.class);

        return platesDTOList;
    }

    @Override
    public Optional<PlatesDto> searchPlatesById(Long id) {
        Optional<Plates> platess = platesRepository.findById(id);

        PlatesDto platessDTOSaved = modelMapper.map(platess.get(), PlatesDto.class);

        Optional<PlatesDto> platessDTOOptional = Optional.ofNullable(platessDTOSaved);

        return platessDTOOptional;
    }

    @Override
    public PlatesDto savePlates(PlatesDto newPlates) {
        Plates plates = modelMapper.map(newPlates, Plates.class);

        Plates platesSaved = platesRepository.save(plates);

        PlatesDto platesSavedDTO = modelMapper.map(platesSaved, PlatesDto.class);

        return platesSavedDTO;
    }

    @Override
    public void deletePlatesById(Long id) {
        if (platesRepository.findById(id).isPresent()) {
            platesRepository.deleteById(id);
            logger.info("Deleted plates: " + id);
        } else {
            logger.info("Not Foud");
        }
    }

    @Override
    public PlatesDto modifyPlates(PlatesDto platessDTO) {
        Plates plates = modelMapper.map(platessDTO, Plates.class);

        Plates platesSaved = platesRepository.save(plates);

        PlatesDto platesSavedDTO = modelMapper.map(platesSaved, PlatesDto.class);

        return platesSavedDTO;
    }
}