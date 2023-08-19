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
public class BundleUpdateRequest {

    @NotBlank
    private String name;
    @NotBlank
    private String description;

    private MultipartFile image;

    private List<MultipartFile> galleryImages;
    @NotNull
    private List<String> starter;
    @NotNull
    private List<String> mainCourse;
    @NotNull
    private List<String> desserts;
    @NotNull
    private List<String> drinks;
    @NotNull
    private List<Long> characteristics;
    @NotNull
    private List<Long> categories;
}
