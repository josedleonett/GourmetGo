package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CharacteristicCreateRequest {
    @NotBlank
    private String name;
}
