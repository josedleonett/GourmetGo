package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.BundleDto;

import java.util.List;
import java.util.Optional;

public interface IBundleService {
    List<BundleDto> searchAllBundles();

    Optional<BundleDto> searchBundleById(Long id);

    BundleDto saveBundle(BundleDto newBundle);

    void deleteBundleById(Long id);

    BundleDto modifyBundle(BundleDto bundlesDTO);
}
