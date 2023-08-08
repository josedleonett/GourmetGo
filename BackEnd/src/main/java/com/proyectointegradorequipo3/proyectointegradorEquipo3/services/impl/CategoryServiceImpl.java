package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Category;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CategoryCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.CategoryDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.CategoryNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICategoryRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IBundleService;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.ICategoryService;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements ICategoryService {

    private static final String NAME = "Category";

    private final ICategoryRepository categoryRepository;

    private final IBundleRepository bundleRepository;

    private final ModelMapper mapper;
    private final S3Service s3Service;

    Logger logger = Logger.getLogger(DrinkServiceImpl.class.getName());


    //===================Find===================//

    @Override
    public List<CategoryDto> searchAllCategory() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(category -> {
                    List<Bundle> bundles = bundleRepository.findAllBundlesByCategoryId(category.getId());
                    List<Long> bundleIds = bundles.stream()
                            .map(Bundle::getId)
                            .collect(Collectors.toList());

                    CategoryDto categoryDto = new CategoryDto();
                    categoryDto.setId(category.getId());
                    categoryDto.setName(category.getName());
                    categoryDto.setDescription(category.getDescription());
                    categoryDto.setImg(category.getImg());
                    categoryDto.setBundles(bundleIds);

                    return categoryDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDto searchCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        List<Bundle> bundles = bundleRepository.findAllBundlesByCategoryId(category.getId());
        List<Long> bundleIds = bundles.stream()
                .map(Bundle::getId)
                .collect(Collectors.toList());
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        categoryDto.setDescription(category.getDescription());
        categoryDto.setImg(category.getImg());
        categoryDto.setBundles(bundleIds);
        return categoryDto;
    }

    @Override
    public Category searchCategoryByName(String name) {
        Optional<Category> optionalCategory = categoryRepository.findByName(name);
        return optionalCategory.orElseThrow(() -> new CategoryNotFoundException("Category with name '" + name + "' not found"));
    }

    //===================Create===================//
    @Override
    public Long saveCategory(CategoryCreateRequest request) {
        String keyImage = s3Service.putObject(request.getImg());
        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .img(keyImage)
                .build();
        existsName(category.getName());
        save(category);
        return category.getId();
    }


    public void save(Category category) {
        categoryRepository.save(category);
    }

    //===================Update===================//

    @Override
    public void modifyCategory(Long id, Category request) {
        Optional<Category> category = categoryRepository.findById(id);
    }

    //===================Delete===================//
    @Override
    public void deleteCategoryById(Long id) {
        Category category = mapper.map(searchCategoryById(id), Category.class);
        categoryRepository.delete(category);
    }


    //===================Util===================//
    private void existsName(String name) {
        if (categoryRepository.existsByName(name)) throw new ExistNameException(name);
    }
}
