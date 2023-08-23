package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String lastName;

    @NotBlank
    private String email;

    @NotBlank
    private String role;

    @JsonProperty("isConfirmed")
    private boolean isConfirmed;
}
