package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GetAllServiceImpl {

    private final BundleServiceImpl bundleService;

    private final IBundleRepository bundleRepository;

    public List<BundleDto> searchAllBundles() {
        List<Long> ids = bundleRepository.findAllIds();
        return ids.stream().map(bundleService::searchBundleDtoById).collect(Collectors.toList());
    }
}
