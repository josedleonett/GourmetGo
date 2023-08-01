package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.DrinksDto;

import java.util.List;
import java.util.Optional;

public interface IDrinksServices {
    List<DrinksDto> searchAllDrinks();

    Optional<DrinksDto> searchDrinkById(Long id);

    DrinksDto saveDrink(DrinksDto newDrink);

    void deleteDrinkById(Long id);

    DrinksDto modifyDrink(DrinksDto platesDTO);
}
