package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plate;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.PlateCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.PlateUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.PlateDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.PlateNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.PlateServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.*;

@RestController
@RequestMapping(PLATE_URI)
@RequiredArgsConstructor
public class PlateController {

    private final PlateServiceImpl plateService;
    private final ModelMapper mapper;

    //====================Create====================//

    @PostMapping(path = "/create")
    public ResponseEntity<Void> createPlate(@RequestBody @Valid PlateCreateRequest request) {
        long id = plateService.savePlate(mapper.map(request, Plate.class));
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).build();
    }

    //====================Display all====================//

    @GetMapping
    public ResponseEntity<List<PlateDto>> getAllPlates() {
        List<Plate> plates = plateService.searchAllPlate();
        List<PlateDto> plateDtos = plates.stream()
                .map(plate -> mapper.map(plate, PlateDto.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(plateDtos);
    }


    //====================Get one by id====================//

    @GetMapping(path = "/{id}")
    public ResponseEntity<PlateDto> getById(@Valid @NotNull @PathVariable("id") Long id) {
        return ResponseEntity.ok(mapper.map(plateService.searchPlateById(id), PlateDto.class));
    }

    //====================Get one by name====================//
    @GetMapping(path = "/search")
    public ResponseEntity<PlateDto> getPlateByName(@RequestParam("name") String name) {
        Plate plate = plateService.searchPlateByName(name);
        if (plate != null) {
            return ResponseEntity.ok(mapper.map(plate, PlateDto.class));
        } else {
            throw new PlateNotFoundException("Plate with name '" + name + "' not found");
        }
    }

    //====================Update====================//

    @PatchMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePlate(@PathVariable("id") @NotNull Long id, @RequestBody @Valid PlateUpdateRequest request) {
        plateService.modifyPlate(id, mapper.map(request, Plate.class));
    }

    //====================Deletes====================//

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePlate(@PathVariable @NotBlank @Valid Long id) {
        plateService.deletePlateById(id);
    }

}
