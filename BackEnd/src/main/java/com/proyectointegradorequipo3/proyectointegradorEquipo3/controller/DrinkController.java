package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.DrinkCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.DrinkServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

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
}
