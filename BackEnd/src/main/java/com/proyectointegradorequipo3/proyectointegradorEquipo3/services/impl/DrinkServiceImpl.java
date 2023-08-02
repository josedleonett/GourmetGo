package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.DrinkNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IDrinkRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IDrinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class DrinkServiceImpl implements IDrinkService {

    private static final String NAME = "Drink";
    private final IDrinkRepository drinkRepository;
    Logger logger = Logger.getLogger(DrinkServiceImpl.class.getName());


    //===================Find===================//
    @Override
    @Transactional(readOnly = true)
    public List<Drink> searchAllDrinks() {
        return drinkRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Drink searchDrinkById(Long id) {
        return drinkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(NAME, id));
    }

    @Override
    @Transactional(readOnly = true)
    public Drink searchDrinkByName(String name) {
        Optional<Drink> optionalDrink = drinkRepository.findByName(name);
        return optionalDrink.orElseThrow(() -> new DrinkNotFoundException("Drink with name '" + name + "' not found"));
    }

    //===================Create===================//
    @Override
    public Long saveDrink(Drink newDrink) {
        existsName(newDrink.getName());
        save(newDrink);
        return newDrink.getId();
    }

    public void save(Drink drink) {
        drinkRepository.save(drink);
    }


    //===================Update===================//
    @Override
    @Transactional
    public void modifyDrink(Long id, Drink request) {
        Drink drink = searchDrinkById(id);
        drink.setName(request.getName());
        drink.setImage(request.getImage());
        drink.setPrice(request.getPrice());
        drink.setAmount(request.getAmount());
        save(drink);

    }

    //===================Delete===================//
    @Override
    public void deleteDrinkById(Long id) {
        Drink drink = searchDrinkById(id);
        drinkRepository.delete(drink);
    }

    //===================Util===================//
    private void existsName(String name) {
        if (drinkRepository.existsByName(name)) throw new ExistNameException(name);
    }
}