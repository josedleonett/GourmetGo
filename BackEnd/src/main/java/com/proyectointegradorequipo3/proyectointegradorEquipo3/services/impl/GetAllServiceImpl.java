package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.*;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IDrinkRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IPlateRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GetAllServiceImpl {

    private final BundleServiceImpl bundleService;
    private final IBundleRepository bundleRepository;

    private final PlateServiceImpl plateService;
    private final IPlateRepository plateRepository;

    private final DrinkServiceImpl drinkService;
    private final IDrinkRepository drinkRepository;


    public List<BundleDto> searchAllBundles() {
        List<Long> ids = bundleRepository.findAllIds();
        return ids.stream().map(bundleService::searchBundleDtoById).collect(Collectors.toList());
    }

    public List<BundleForCardDto> searchAllBundlesForCards() {
        List<Long> ids = bundleRepository.findAllIds();
        return ids.stream().map(bundleService::searchBundleDtoByIdForCards).collect(Collectors.toList());
    }

    public List<PlateDto> searchAllPlates() {
        List<Long> ids = plateRepository.findAllIds();
        return ids.stream().map(plateService::searchPlateById).collect(Collectors.toList());
    }

    public List<DrinkDto> searchAllDrinks() {
        List<Long> ids = drinkRepository.findAllIds();
        return ids.stream().map(drinkService::searchDrinkById).collect(Collectors.toList());
    }

}
