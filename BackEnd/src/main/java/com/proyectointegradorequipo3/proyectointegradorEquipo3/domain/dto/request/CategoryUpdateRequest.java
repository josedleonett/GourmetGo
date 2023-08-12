package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryUpdateRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotBlank
    private MultipartFile img;
}
