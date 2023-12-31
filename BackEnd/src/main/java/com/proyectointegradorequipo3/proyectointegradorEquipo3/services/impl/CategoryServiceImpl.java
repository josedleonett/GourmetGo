package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Category;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CategoryCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.CategoryUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.CategoryDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.CategoryNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICategoryRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.ICategoryService;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    @Cacheable(value = "searchAllCategory", unless = "#result == null || #result.isEmpty()")
    public List<CategoryDto> searchAllCategory() {
        return categoryRepository.findAll().stream()
                .map(category -> {
                    Map<Long, String> bundleMap = getBundleMapByCategoryId(category.getId());

                    return new CategoryDto(
                            category.getId(),
                            category.getName(),
                            category.getDescription(),
                            category.getImage(),
                            bundleMap
                    );
                })
                .collect(Collectors.toList());
    }



    @Override
    @Cacheable(value = "searchCategoryById", unless = "#result == null")
    public CategoryDto searchCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));

        Map<Long, String> bundleMap = getBundleMapByCategoryId(category.getId());

        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getImage(),
                bundleMap
        );
    }


    @Override
    @Cacheable(value = "searchCategoryByName", unless = "#result == null")
    public CategoryDto searchCategoryByName(String name) {
        Category category = categoryRepository.findByName(name)
                .orElseThrow(() -> new CategoryNotFoundException("Category with name '" + name + "' not found"));

        CategoryDto categoryDto = mapper.map(category, CategoryDto.class);
        categoryDto.setBundles(getBundleMapByCategoryId(category.getId()));

        return categoryDto;

    }

    //===================Create===================//
    @Override
    @Transactional
    @CacheEvict(value = {"searchAllCategory","searchCategoryById","searchCategoryByName"}, allEntries = true, beforeInvocation = false)
    public Long saveCategory(CategoryCreateRequest request) {
        String keyImage = s3Service.putObject(request.getImage());
        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .image(keyImage)
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
    @Transactional
    @CacheEvict(value = {"searchAllCategory","searchCategoryById","searchCategoryByName", "getBundleIdsByCategoryId", "getBundleMapByCategoryId"}, allEntries = true, beforeInvocation = false)
    public void modifyCategory(Long id, CategoryUpdateRequest request) {
        CategoryDto categoryDto = searchCategoryById(id);

        if (request.getName() != null) {
            categoryDto.setName(request.getName());
        }

        if (request.getDescription() != null) {
            categoryDto.setDescription(request.getDescription());
        }

        MultipartFile newImage = request.getImage();
        if (newImage != null && !newImage.isEmpty()) {

            s3Service.deleteObject(categoryDto.getImage());

            String newImageUrl = s3Service.putObject(newImage);
            categoryDto.setImage(newImageUrl);
        }

        Category category = mapper.map(categoryDto, Category.class);
        category.setId(id);
        save(category);
    }

    //===================Delete===================//
    @Override
    @Transactional
    @CacheEvict(value = {"searchAllCategory","searchCategoryById","searchCategoryByName", "getBundleIdsByCategoryId", "getBundleMapByCategoryId"}, allEntries = true, beforeInvocation = false)
    public void deleteCategoryById(Long id) {
        Category category = mapper.map(searchCategoryById(id), Category.class);
        categoryRepository.delete(category);
    }


    //===================Util===================//
    private void existsName(String name) {
        if (categoryRepository.existsByName(name)) throw new ExistNameException(name);
    }


    @Cacheable(value = "getBundleIdsByCategoryId", unless = "#result == null")
    public List<Long> getBundleIdsByCategoryId(Long categoryId) {
        return bundleRepository.findAllBundlesByCategoryId(categoryId)
                .stream()
                .map(Bundle::getId)
                .collect(Collectors.toList());
    }

    @Cacheable(value = "getBundleMapByCategoryId", unless = "#result == null")
    public Map<Long, String> getBundleMapByCategoryId(Long categoryId) {
        List<Bundle> bundles = bundleRepository.findAllBundlesByCategoryId(categoryId);
        Map<Long, String> bundleMap = new HashMap<>();

        for (Bundle bundle : bundles) {
            bundleMap.put(bundle.getId(), bundle.getName());
        }

        return bundleMap;
    }



}
