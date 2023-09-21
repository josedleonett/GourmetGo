package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CategoryCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CategoryUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.CategoryDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.CategoryNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.CategoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.CATEGORY_URI;

@RestController
@RequestMapping(CATEGORY_URI)
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class CategoryController {

    private final CategoryServiceImpl categoryService;

    //====================Create====================//
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "/create")
    public ResponseEntity<Void> createCategory(@ModelAttribute @Valid CategoryCreateRequest request,
                                               @RequestPart MultipartFile image) {
        request.setImage(image);
        long id = categoryService.saveCategory(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).build();
    }

    //====================Display all====================//

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categoryDtos = categoryService.searchAllCategory();
        return ResponseEntity.ok(categoryDtos);
    }

    //====================Get one by id====================//

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long id) {
        CategoryDto categoryDto = categoryService.searchCategoryById(id);
        return ResponseEntity.ok(categoryDto);
    }

    //====================Get one by name====================//
    @GetMapping("/search")
    public ResponseEntity<CategoryDto> searchCategoryByName(@RequestParam String name) {
        CategoryDto categoryDto = categoryService.searchCategoryByName(name);

        if (categoryDto != null) {
            return ResponseEntity.ok(categoryDto);
        }

        throw new CategoryNotFoundException("Category with name '" + name + "' not found");
    }

    //====================Update====================//
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void modifyCategory(@PathVariable Long id, @ModelAttribute @Valid CategoryUpdateRequest updateModel) {
        categoryService.modifyCategory(id, updateModel);
    }

    //===================Delete===================//
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategoryById(@PathVariable Long id) {
        categoryService.deleteCategoryById(id);
    }

}
