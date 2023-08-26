package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.DrinkCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.DrinkUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.DrinkDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.DrinkNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IDrinkRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IDrinkService;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class DrinkServiceImpl implements IDrinkService {

    private static final String NAME = "Drink";
    private final IDrinkRepository drinkRepository;

    private final S3Service s3Service;

    private final ModelMapper mapper;

    Logger logger = Logger.getLogger(DrinkServiceImpl.class.getName());


    //===================Find===================//
    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "searchAllDrinks", unless = "#result == null || #result.isEmpty()")
    public List<DrinkDto> searchAllDrinks() {
        List<Drink> drinks = drinkRepository.findAll();
        return drinks.stream()
                .map(drink -> mapper.map(drink, DrinkDto.class))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "searchDrinkById", unless = "#result == null")
    public DrinkDto searchDrinkById(Long id) {
        Drink drink = drinkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        return mapper.map(drink, DrinkDto.class);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "searchDrinkByName", unless = "#result == null")
    public DrinkDto searchDrinkByName(String name) {
        Optional<Drink> optionalDrink = drinkRepository.findByName(name);
        if (optionalDrink.isEmpty()) {
            throw new DrinkNotFoundException("Drink with name '" + name + "' not found");
        }
        return mapper.map(optionalDrink.get(), DrinkDto.class);
    }

    //===================Create===================//
    @Override
    @Transactional
    @CacheEvict(value = {"searchAllDrinks","searchDrinkById","searchDrinkByName"}, allEntries = true, beforeInvocation = false)
    public Long saveDrink(DrinkCreateRequest request) {
        existsName(request.getName());
        Drink newDrink = mapper.map(request, Drink.class);
        String keyImage = s3Service.putObject(request.getImage());
        newDrink.setImage(keyImage);
        save(newDrink);
        return newDrink.getId();
    }

    public void save(Drink drink) {
        drinkRepository.save(drink);
    }


    //===================Update===================//
    @Override
    @Transactional
    @CacheEvict(value = {"searchAllDrinks","searchDrinkById","searchDrinkByName"}, allEntries = true, beforeInvocation = false)
    public void modifyDrink(Long id, DrinkUpdateRequest request) throws Exception {
        try {
            DrinkDto drinkDto = searchDrinkById(id);

            if (request.getName() != null) {
                drinkDto.setName(request.getName());
            }

            if (request.getPrice() != null) {
                drinkDto.setPrice(request.getPrice());
            }

            MultipartFile newImage = request.getImage();
            if (newImage != null && !newImage.isEmpty()) {
                s3Service.deleteObject(drinkDto.getImage());

                String newImageUrl = s3Service.putObject(newImage);
                drinkDto.setImage(newImageUrl);
            }

            Drink drink = mapper.map(drinkDto, Drink.class);
            drink.setId(id);
            save(drink);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


    //===================Delete===================//
    @Override
    @Transactional
    @CacheEvict(value = {"searchAllDrinks","searchDrinkById","searchDrinkByName"}, allEntries = true, beforeInvocation = false)
    public void deleteDrinkById(Long id) {
        DrinkDto drinkDto = searchDrinkById(id);
        Drink drink = mapper.map(drinkDto, Drink.class);
        drinkRepository.delete(drink);
        s3Service.deleteObject(drinkDto.getImage());
    }

    //===================Util===================//
    private void existsName(String name) {
        if (drinkRepository.existsByName(name)) throw new ExistNameException(name);
    }


    public List<Drink> validateAndGetDrink(List<String> drinkNames) {
        List<Drink> drinks = new ArrayList<>();

        for (String drinkName : drinkNames) {
            DrinkDto drinkDto = searchDrinkByName(drinkName);
            if (drinkDto == null) {
                throw new DrinkNotFoundException("Drink with name '" + drinkName + "' not found");
            }
            drinks.add(mapper.map(drinkDto, Drink.class));
        }

        return drinks;
    }
}