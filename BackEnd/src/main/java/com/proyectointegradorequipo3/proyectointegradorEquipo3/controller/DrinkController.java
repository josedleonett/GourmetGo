package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.DrinkDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.DrinkCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.DrinkUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.DrinkNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.DrinkServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.util.List;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.DRINK_URI;

@RestController
@RequestMapping(DRINK_URI)
@RequiredArgsConstructor
public class DrinkController {

    private final DrinkServiceImpl drinkService;
    private final ModelMapper mapper;

    //====================Create====================//

    @PostMapping(path = "/create")
    public ResponseEntity<Void> createPlate(@RequestBody @Valid DrinkCreateRequest request) {
        long id = drinkService.saveDrink(mapper.map(request, Drink.class));
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).build();
    }

    //====================Display all====================//

    @GetMapping
    public ResponseEntity<List<DrinkDto>> getAllDrinks() {
        List<Drink> drinks = drinkService.searchAllDrinks();
        List<DrinkDto> drinkDtos = drinks.stream()
                .map(drink -> mapper.map(drink, DrinkDto.class))
                .toList();

        return ResponseEntity.ok(drinkDtos);
    }

    //====================Get one by id====================//

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getById(@Valid @NotNull @PathVariable("id") Long id) {
        Drink drink = drinkService.searchDrinkById(id);
        if (drink != null) {
            return ResponseEntity.ok(mapper.map(drink, DrinkDto.class));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //====================Get one by name====================//
    @GetMapping(path = "/search")
    public ResponseEntity<DrinkDto> getDrinkByName(@RequestParam("name") String name) {
        Drink drink = drinkService.searchDrinkByName(name);
        if (drink != null) {
            return ResponseEntity.ok(mapper.map(drink, DrinkDto.class));
        } else {
            throw new DrinkNotFoundException("Drink with name '" + name + "' not found");
        }
    }

    //====================Update====================//

    @PatchMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateDrink(@PathVariable("id") @NotNull Long id, @RequestBody @Valid DrinkUpdateRequest request) {
        drinkService.modifyDrink(id, mapper.map(request, Drink.class));
    }

    //====================Deletes====================//

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDrink(@PathVariable Long id) {
        drinkService.deleteDrinkById(id);
    }
}

