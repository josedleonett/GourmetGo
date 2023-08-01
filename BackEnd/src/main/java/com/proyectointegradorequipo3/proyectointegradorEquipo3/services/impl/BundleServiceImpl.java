package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.configuration.MapperConfig;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IBundleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
@RequiredArgsConstructor
@Service
public class BundleServiceImpl implements IBundleService {
    private final IBundleRepository bundleRepository;
    Logger logger = Logger.getLogger(BundleServiceImpl.class.getName());

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<BundleDto> searchAllBundles() {

        List<Bundle> bundleList = bundleRepository.findAll();

        return MapperConfig.mapAll(bundleList, BundleDto.class);
    }

    @Override
    public Optional<BundleDto> searchBundleById(Long id) {
        Optional<Bundle> bundles = bundleRepository.findById(id);

        BundleDto bundlesDTOSaved = modelMapper.map(bundles.get(), BundleDto.class);

        return Optional.ofNullable(bundlesDTOSaved);
    }

    @Override
    public BundleDto saveBundle(BundleDto newBundle) {
        Bundle bundle = modelMapper.map(newBundle, Bundle.class);

        Bundle bundleSaved = bundleRepository.save(bundle);

        return modelMapper.map(bundleSaved, BundleDto.class);
    }

    @Override
    public void deleteBundleById(Long id) {
        if (bundleRepository.findById(id).isPresent()) {
            bundleRepository.deleteById(id);
            logger.info("Deleted bundle: " + id);
        } else {
            logger.info("Not Foud");
        }
    }

    @Override
    public BundleDto modifyBundle(BundleDto bundlesDTO) {
        Bundle bundle = modelMapper.map(bundlesDTO, Bundle.class);

        Bundle bundleSaved = bundleRepository.save(bundle);

        return modelMapper.map(bundleSaved, BundleDto.class);
    }
}
