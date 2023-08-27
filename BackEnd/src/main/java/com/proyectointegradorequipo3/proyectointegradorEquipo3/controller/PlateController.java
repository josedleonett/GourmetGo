package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.PlateCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.PlateUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.PlateDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.GetAllServiceImpl;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.PlateServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.util.List;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.*;

@RestController
@RequestMapping(PLATE_URI)
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class PlateController {

    private final PlateServiceImpl plateService;

    private final GetAllServiceImpl getAllService;

    //====================Create====================//

    @PostMapping(path = "/create")
    public ResponseEntity<Void> createPlate(@Valid PlateCreateRequest request) {
        long id = plateService.savePlate(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).build();
    }

    //====================Display all====================//

    @GetMapping
    public ResponseEntity<List<PlateDto>> getAllPlates() {
        List<PlateDto> plateDtos = getAllService.searchAllPlates();
        return ResponseEntity.ok(plateDtos);
    }


    //====================Get one by id====================//

    @GetMapping(path = "/{id}")
    public ResponseEntity<PlateDto> getById(@Valid @NotNull @PathVariable("id") Long id) {
        return ResponseEntity.ok(plateService.searchPlateById(id));
    }

    //====================Get one by name====================//
    @GetMapping(path = "/search")
    public ResponseEntity<PlateDto> getPlateByName(@RequestParam("name") String name) {
        PlateDto plateDto = plateService.searchPlateByName(name);

        return ResponseEntity.ok(plateDto);
    }


    //====================Update====================//

    @PatchMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePlate(@PathVariable("id") @NotNull Long id, @ModelAttribute @Valid PlateUpdateRequest request) throws Exception {
        plateService.modifyPlate(id, request);
    }

    //====================Delete====================//

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePlate(@PathVariable @NotBlank @Valid Long id) throws Exception {
        plateService.deletePlateById(id);
    }

}
