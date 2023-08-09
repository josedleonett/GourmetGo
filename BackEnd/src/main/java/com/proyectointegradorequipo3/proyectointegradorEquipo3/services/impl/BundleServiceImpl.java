package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Category;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plate;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.CategoryDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.PlateDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICategoryRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IBundleService;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BundleServiceImpl implements IBundleService {

    private static final String NAME = "Bundle";
    private final IBundleRepository bundleRepository;

    private final PlateServiceImpl plateService;

    private final DrinkServiceImpl drinkService;


    private final ICategoryRepository categoryRepository;

    private final ModelMapper mapper;

    private final S3Service s3Service;

    Logger logger = Logger.getLogger(BundleServiceImpl.class.getName());

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<BundleDto> searchAllBundles() {
        List<Bundle> bundles = bundleRepository.findAll();
        return bundles.stream()
                .map(bundle -> {
                    BundleDto bundleDto = new BundleDto();

                    bundleDto.setId(bundle.getId());
                    bundleDto.setName(bundle.getName());
                    bundleDto.setDescription(bundle.getDescription());
                    bundleDto.setNumberDiners(bundle.getNumberDiners());
                    bundleDto.setBundleImage(bundle.getBundleImage());
                    bundleDto.setGalleryImages(bundle.getGalleryImages());
                    bundleDto.setDrinks(bundle.getDrinks());
                    bundleDto.setCategories(bundle.getCategories());
                    bundleDto.setRating(bundle.getRating());

                    List<PlateDto> starterDtoList = bundle.getStarter().stream()
                            .map(plate -> new PlateDto(plate.getName(), plate.getType(), plate.getDescription(), plate.getImage()))
                            .collect(Collectors.toList());
                    bundleDto.setStarter(starterDtoList);

                    List<PlateDto> mainCourseDtoList = bundle.getMainCourse().stream()
                            .map(plate -> new PlateDto(plate.getName(), plate.getType(), plate.getDescription(), plate.getImage()))
                            .collect(Collectors.toList());
                    bundleDto.setMainCourse(mainCourseDtoList);

                    List<PlateDto> dessertsDtoList = bundle.getDesserts().stream()
                            .map(plate -> new PlateDto(plate.getName(), plate.getType(), plate.getDescription(), plate.getImage()))
                            .collect(Collectors.toList());
                    bundleDto.setDesserts(dessertsDtoList);



                    return bundleDto;
                })
                .collect(Collectors.toList());
    }


    @Override
    public BundleDto searchBundleDtoById(Long id) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        return modelMapper.map(bundle, BundleDto.class);
    }


    //===================Create===================//
    @Override
    @Transactional
    public Long saveBundle(BundleCreateRequest request) {
        List<Plate> starter = plateService.validateAndGetPlates(request.getStarter(), "Starter");
        List<Plate> mainCourse = plateService.validateAndGetPlates(request.getMainCourse(), "Main course");
        List<Plate> dessert = plateService.validateAndGetPlates(request.getDesserts(), "Dessert");

        List<Drink> drinks = request.getDrinks().stream()
                .map(drinkService::searchDrinkByName)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        if (drinks.isEmpty()) {
            throw new RuntimeException("No valid drinks found for the Bundle.");
        }


        List<Long> categoryIds = request.getCategories();
        List<Category> categories = categoryRepository.findAllById(categoryIds);

        String keyImage = s3Service.putObject(request.getBundleImage());
        List<String> keys = new ArrayList<>();

        for (MultipartFile image : request.getGalleryImages()) {
            String key = s3Service.putObject(image);
            keys.add(key);
        }

        Bundle newBundle = Bundle.builder()
                .name(request.getName())
                .numberDiners(request.getNumberDiners())
                .description(request.getDescription())
                .bundleImage(keyImage)
                .galleryImages(keys)
                .starter(starter)
                .mainCourse(mainCourse)
                .desserts(dessert)
                .drinks(drinks)
                .categories(categories)
                .rating(0.)
                .build();

        existsName(newBundle.getName());
        save(newBundle);
        return newBundle.getId();
    }


    public void save(Bundle bundle) {
        bundleRepository.save(bundle);
    }


    //===================Update===================//
    @Override
    @Transactional
    public void modifyBundle(Long id, BundleUpdateRequest request) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bundle", id));

        List<Plate> starter = plateService.validateAndGetPlates(request.getStarter(), "Starter");
        List<Plate> mainCourse = plateService.validateAndGetPlates(request.getMainCourse(), "Main course");
        List<Plate> dessert = plateService.validateAndGetPlates(request.getDesserts(), "Dessert");

        List<Drink> drinks = request.getDrinks().stream()
                .map(drinkService::searchDrinkByName)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        if (drinks.isEmpty()) {
            throw new RuntimeException("No valid drinks found for the Bundle.");
        }

        bundle.setName(request.getName());
        bundle.setNumberDiners(request.getNumberDiners());
        bundle.setBundleImage(request.getBundleImage());
        bundle.setGalleryImages(request.getGalleryImages());
        bundle.setStarter(starter);
        bundle.setMainCourse(mainCourse);
        bundle.setDesserts(dessert);
        bundle.setDrinks(drinks);

        bundleRepository.save(bundle);
    }

    //===================Delete===================//
    @Override
    public void deleteBundleById(Long id) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        s3Service.deleteObject(bundle.getBundleImage());
        for (String image : bundle.getGalleryImages()) {
            s3Service.deleteObject(image);
        }
        bundleRepository.delete(bundle);
    }

    //===================Util===================//
    private void existsName(String name) {
        if (bundleRepository.existsByName(name)) throw new ExistNameException(name);
    }
}
