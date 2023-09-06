package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CharacteristicDto {
    @NotNull
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String image;
}
