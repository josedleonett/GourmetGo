package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.DrinkDto;

import java.util.List;
import java.util.Optional;

public interface IDrinkService {
    List<Drink> searchAllDrinks();

    Drink searchDrinkById(Long id);

    Long saveDrink(Drink newDrink);

    void deleteDrinkById(Long id);

    void modifyDrink(Long id, Drink drink);
}
