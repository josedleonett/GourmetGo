package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IDrinkRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IDrinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.logging.Logger;
@RequiredArgsConstructor
@Service
public class DrinkServiceImpl implements IDrinkService {

    private final IDrinkRepository drinksRepository;
    Logger logger = Logger.getLogger(DrinkServiceImpl.class.getName());


    @Override
    public List<Drink> searchAllDrinks() {
        return null;
    }

    @Override
    public Drink searchDrinkById(Long id) {
        return null;
    }

    //===================Create===================//

    @Override
    public Long saveDrink(Drink newDrink) {
        existsName(newDrink.getName());
        save(newDrink);
        return newDrink.getId();
    }

    public void save(Drink drink) {
        drinksRepository.save(drink);
    }

    @Override
    public void deleteDrinkById(Long id) {

    }

    @Override
    public void modifyDrink(Long id, Drink drink) {

    }

    private void existsName(String name) {
        if (drinksRepository.existsByName(name)) throw new ExistNameException(name);
    }
}