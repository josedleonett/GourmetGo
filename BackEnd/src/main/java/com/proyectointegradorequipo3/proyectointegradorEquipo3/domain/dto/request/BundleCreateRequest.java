package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BundleCreateRequest {

    @NotBlank
    private String name;
    @NotNull
    private int numberDiners;
    @NotBlank
    private MultipartFile bundleImage;
    @NotNull
    private List<MultipartFile> galleryImages;
    @NotNull
    private String starter;
    @NotNull
    private String mainCourse;
    @NotNull
    private String desserts;
    @NotNull
    private List<String> drinks;
}
