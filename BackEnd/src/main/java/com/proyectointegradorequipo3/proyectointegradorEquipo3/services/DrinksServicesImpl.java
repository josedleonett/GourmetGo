package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.configuration.MapperConfig;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drinks;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.DrinksDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IDrinksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

public class DrinksServicesImpl implements IDrinksServices{
    private final IDrinksRepository drinksRepository;
    Logger logger = Logger.getLogger(DrinksServicesImpl.class.getName());

    @Autowired
    private ModelMapper modelMapper;

    public DrinksServicesImpl(IDrinksRepository drinksRepository) {
        this.drinksRepository = drinksRepository;
    }


    @Override
    public List<DrinksDto> searchAllDrinks() {

        List<Drinks> drinksList = drinksRepository.findAll();

        List<DrinksDto> drinksDTOList = MapperConfig.mapAll(drinksList, DrinksDto.class);

        return drinksDTOList;
    }

    @Override
    public Optional<DrinksDto> searchDrinkById(Long id) {
        Optional<Drinks> drinkss = drinksRepository.findById(id);

        DrinksDto drinkssDTOSaved = modelMapper.map(drinkss.get(), DrinksDto.class);

        Optional<DrinksDto> drinkssDTOOptional = Optional.ofNullable(drinkssDTOSaved);

        return drinkssDTOOptional;
    }

    @Override
    public DrinksDto saveDrink(DrinksDto newDrink) {
        Drinks drinks = modelMapper.map(newDrink, Drinks.class);

        Drinks drinksSaved = drinksRepository.save(drinks);

        DrinksDto drinksSavedDTO = modelMapper.map(drinksSaved, DrinksDto.class);

        return drinksSavedDTO;
    }

    @Override
    public void deleteDrinkById(Long id) {
        if (drinksRepository.findById(id).isPresent()) {
            drinksRepository.deleteById(id);
            logger.info("Deleted drinks: " + id);
        } else {
            logger.info("Not Foud");
        }
    }

    @Override
    public DrinksDto modifyDrink(DrinksDto drinkssDTO) {
        Drinks drinks = modelMapper.map(drinkssDTO, Drinks.class);

        Drinks drinksSaved = drinksRepository.save(drinks);

        DrinksDto drinksSavedDTO = modelMapper.map(drinksSaved, DrinksDto.class);

        return drinksSavedDTO;
    }
}