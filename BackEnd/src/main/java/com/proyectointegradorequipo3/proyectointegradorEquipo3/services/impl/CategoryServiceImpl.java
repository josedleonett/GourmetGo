package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Category;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.CategoryNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.DrinkNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICategoryRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements ICategoryService {

    private static final String NAME = "Category";

    private final ICategoryRepository categoryRepository;

    Logger logger = Logger.getLogger(DrinkServiceImpl.class.getName());


    //===================Find===================//

    @Override
    public List<Category> searchAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public Category searchCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(NAME, id));
    }

    @Override
    public Category searchCategoryByName(String name) {
        Optional<Category> optionalCategory = categoryRepository.findByName(name);
        return optionalCategory.orElseThrow(() -> new CategoryNotFoundException("Category with name '" + name + "' not found"));
    }

    //===================Create===================//
    @Override
    public Long saveCategory(Category newCategory) {
        existsName(newCategory.getName());
        save(newCategory);
        return newCategory.getId();
    }


    public void save(Category category) {
        categoryRepository.save(category);
    }

    //===================Update===================//

    @Override
    public void modifyCategory(Long id, Category request) {
        Category category = searchCategoryById(id);
        category.setName(request.getName());
        save(category);
    }

    //===================Delete===================//
    @Override
    public void deleteCategoryById(Long id) {
        Category category = searchCategoryById(id);
        categoryRepository.delete(category);
    }


    //===================Util===================//
    private void existsName(String name) {
        if (categoryRepository.existsByName(name)) throw new ExistNameException(name);
    }
}
