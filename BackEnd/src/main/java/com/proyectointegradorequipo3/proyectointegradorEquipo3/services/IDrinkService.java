package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;

import java.util.List;

public interface IDrinkService {
    List<Drink> searchAllDrinks();

    Drink searchDrinkById(Long id);

    Drink searchDrinkByName(String name);

    Long saveDrink(Drink newDrink);

    void deleteDrinkById(Long id);

    void modifyDrink(Long id, Drink drink);
}
