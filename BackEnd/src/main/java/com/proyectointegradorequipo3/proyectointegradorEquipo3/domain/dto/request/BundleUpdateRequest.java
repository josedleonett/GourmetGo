package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BundleUpdateRequest {

    @NotBlank
    private String name;
    @NotNull
    private int numberDiners;
    @NotBlank
    private String description;
    @NotBlank
    private String bundleImage;
    @NotNull
    private List<String> galleryImages;
    @NotNull
    private List<String> starter;
    @NotNull
    private List<String> mainCourse;
    @NotNull
    private List<String> desserts;
    @NotNull
    private List<String> drinks;
    @NotNull
    private List<Integer> categories;
}
