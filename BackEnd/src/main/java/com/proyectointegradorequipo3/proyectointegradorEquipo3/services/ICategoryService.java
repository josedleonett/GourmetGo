package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> searchAllCategory();

    Category searchCategoryById(Long id);

    Category searchCategoryByName(String name);

    Long saveCategory(Category newCategory);

    void deleteCategoryById(Long id);

    void modifyCategory(Long id, Category category);
}
