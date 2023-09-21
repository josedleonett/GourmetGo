package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CharacteristicCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CharacteristicUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.CharacteristicDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.CharacteristicNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.CharacteristicServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

import java.net.URI;
import java.util.List;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.CHARACTERISTIC_URI;

@RestController
@RequestMapping(CHARACTERISTIC_URI)
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class CharacteristicController {

    private final CharacteristicServiceImpl characteristicService;

    //====================Create====================//
    @PostMapping(path = "/create")
    public ResponseEntity<Void> createCharacteristic(@Valid @RequestBody CharacteristicCreateRequest request) {
        long id = characteristicService.saveCharacteristic(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).build();
    }

    //====================Display all====================//
    @GetMapping
    public ResponseEntity<List<CharacteristicDto>> getAllCharacteristics() {
        List<CharacteristicDto> characteristicDtos = characteristicService.searchAllCharacteristic();
        return ResponseEntity.ok(characteristicDtos);
    }

    //====================Get one by id====================//
    @GetMapping("/{id}")
    public ResponseEntity<CharacteristicDto> getCharacteristicById(@PathVariable Long id) {
        CharacteristicDto characteristicDto = characteristicService.searchCharacteristicById(id);
        return ResponseEntity.ok(characteristicDto);
    }

    //====================Get one by name====================//
    @GetMapping("/search")
    public ResponseEntity<CharacteristicDto> searchCharacteristicByName(@RequestParam String name) {
        CharacteristicDto characteristicDto = characteristicService.searchCharacteristicByName(name);

        if (characteristicDto != null) {
            return ResponseEntity.ok(characteristicDto);
        }

        throw new CharacteristicNotFoundException("Characteristic with name '" + name + "' not found");
    }

    //====================Update====================//
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void modifyCharacteristic(@PathVariable Long id,
                                     @Valid @RequestBody CharacteristicUpdateRequest updateModel) {
        characteristicService.modifyCharacteristic(id, updateModel);
    }

    //===================Delete===================//
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCharacteristicById(@PathVariable Long id) {
        characteristicService.deleteCharacteristicById(id);
    }
}
