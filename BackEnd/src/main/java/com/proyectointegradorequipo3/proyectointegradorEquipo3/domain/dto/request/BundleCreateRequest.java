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
    private String description;
    private MultipartFile image;
    private List<MultipartFile> galleryImages;
    private List<String> starter;
    private List<String> mainCourse;
    private List<String> desserts;
    private List<String> drinks;
    private List<String> characteristics;
    private List<String> categories;
    private String terms;
}
