package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Drink;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plate;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IBundleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private final ModelMapper mapper;

    Logger logger = Logger.getLogger(BundleServiceImpl.class.getName());

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<BundleDto> searchAllBundles() {
        List<Bundle> bundles = bundleRepository.findAll();
        return bundles.stream()
                .map(bundle -> modelMapper.map(bundle, BundleDto.class))
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
        Plate starter = plateService.validateAndGetPlate(request.getStarter(), "Starter");
        Plate mainCourse = plateService.validateAndGetPlate(request.getMainCourse(), "Main course");
        Plate dessert = plateService.validateAndGetPlate(request.getDesserts(), "Dessert");

        List<Drink> drinks = request.getDrinks().stream()
                .map(drinkService::searchDrinkByName)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        if (drinks.isEmpty()) {
            throw new RuntimeException("No valid drinks found for the Bundle.");
        }

        Bundle newBundle = Bundle.builder()
                .name(request.getName())
                .numberDiners(request.getNumberDiners())
                .bundleImage(request.getBundleImage())
                .galleryImages(request.getGalleryImages())
                .starter(starter)
                .mainCourse(mainCourse)
                .desserts(dessert)
                .drinks(drinks)
                .build();

        existsName(newBundle.getName());
        bundleRepository.save(newBundle);
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

        Plate starter = plateService.validateAndGetPlate(request.getStarter(), "Starter");
        Plate mainCourse = plateService.validateAndGetPlate(request.getMainCourse(), "Main course");
        Plate dessert = plateService.validateAndGetPlate(request.getDesserts(), "Dessert");

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
        bundleRepository.delete(bundle);
    }

    //===================Util===================//
    private void existsName(String name) {
        if (bundleRepository.existsByName(name)) throw new ExistNameException(name);
    }
}
