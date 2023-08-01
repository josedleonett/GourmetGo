package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.BundlesDto;

import java.util.List;
import java.util.Optional;

public interface IBundlesServices {
    List<BundlesDto> searchAllBundles();

    Optional<BundlesDto> searchBundleById(Long id);

    BundlesDto saveBundle(BundlesDto newBundle);

    void deleteBundleById(Long id);

    BundlesDto modifyBundle(BundlesDto bundlesDTO);
}
