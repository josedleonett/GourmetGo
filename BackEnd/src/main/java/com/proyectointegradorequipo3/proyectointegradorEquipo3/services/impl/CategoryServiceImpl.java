package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Category;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CategoryCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CategoryUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.CategoryDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.CategoryNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICategoryRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.ICategoryService;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return categoryRepository.findAll().stream()
                .map(category -> {
                    List<Long> bundleIds = getBundleIdsByCategoryId(category.getId());

                    return new CategoryDto(
                            category.getId(),
                            category.getName(),
                            category.getDescription(),
                            category.getImg(),
                            bundleIds
                    );
                })
                .collect(Collectors.toList());
    }


    @Override
    public CategoryDto searchCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));

        List<Long> bundleIds = getBundleIdsByCategoryId(category.getId());

        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getImg(),
                bundleIds
        );
    }


    @Override
    public CategoryDto searchCategoryByName(String name) {
        Category category = categoryRepository.findByName(name)
                .orElseThrow(() -> new CategoryNotFoundException("Category with name '" + name + "' not found"));

        CategoryDto categoryDto = mapper.map(category, CategoryDto.class);
        categoryDto.setBundles(getBundleIdsByCategoryId(category.getId()));

        return categoryDto;

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
    public void modifyCategory(Long id, CategoryUpdateRequest request) {
        CategoryDto categoryDto = searchCategoryById(id);

        categoryDto.setName(request.getName());
        categoryDto.setDescription(request.getDescription());

        s3Service.deleteObject(categoryDto.getImg());

        String newImageUrl = s3Service.putObject(request.getImg());
        categoryDto.setImg(newImageUrl);

        Category category = mapper.map(categoryDto, Category.class);
        category.setId(id);
        save(category);
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

    private List<Long> getBundleIdsByCategoryId(Long categoryId) {
        return bundleRepository.findAllBundlesByCategoryId(categoryId)
                .stream()
                .map(Bundle::getId)
                .collect(Collectors.toList());
    }

}
