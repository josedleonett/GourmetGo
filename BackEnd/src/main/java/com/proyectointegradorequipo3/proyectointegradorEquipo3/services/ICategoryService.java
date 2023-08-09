package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Category;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CategoryCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.CategoryDto;

import java.util.List;

public interface ICategoryService {
    List<CategoryDto> searchAllCategory();

    CategoryDto searchCategoryById(Long id);

    Category searchCategoryByName(String name);

    Long saveCategory(CategoryCreateRequest newCategory);

    void deleteCategoryById(Long id);

    void modifyCategory(Long id, Category category);
}
