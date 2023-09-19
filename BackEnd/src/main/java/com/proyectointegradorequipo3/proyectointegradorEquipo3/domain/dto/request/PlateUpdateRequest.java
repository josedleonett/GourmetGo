package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlateUpdateRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String type;

    @NotBlank
    private String description;

    @NotBlank
    private Double price;

    @NotBlank
    private MultipartFile image;
}
