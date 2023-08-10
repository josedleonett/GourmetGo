package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.DrinkCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.DrinkUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.DrinkDto;

import java.util.List;

public interface IDrinkService {
    List<DrinkDto> searchAllDrinks();

    DrinkDto searchDrinkById(Long id);

    DrinkDto searchDrinkByName(String name);

    Long saveDrink(DrinkCreateRequest request);

    void deleteDrinkById(Long id);

    void modifyDrink(Long id, DrinkUpdateRequest request) throws Exception;
}
