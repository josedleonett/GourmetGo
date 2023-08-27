package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.NewBundleDto;

import java.util.List;

public interface IBundleService {
    List<BundleDto> searchAllBundles();

    BundleDto searchBundleDtoById(Long id);

    void modifyBundle(Long id, BundleUpdateRequest request);

    void deleteBundleById(Long id);

    Long saveBundle(BundleCreateRequest request);

}
