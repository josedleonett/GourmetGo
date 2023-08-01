package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.configuration.MapperConfig;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundles;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.BundlesDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

public class BundleServicesImpl implements IBundlesServices{
    private final IBundleRepository bundleRepository;
    Logger logger = Logger.getLogger(BundleServicesImpl.class.getName());

    @Autowired
    private ModelMapper modelMapper;

    public BundleServicesImpl(IBundleRepository bundleRepository) {
        this.bundleRepository = bundleRepository;
    }


    @Override
    public List<BundlesDto> searchAllBundles() {

        List<Bundles> bundleList = bundleRepository.findAll();

        List<BundlesDto> bundleDTOList = MapperConfig.mapAll(bundleList, BundlesDto.class);

        return bundleDTOList;
    }

    @Override
    public Optional<BundlesDto> searchBundleById(Long id) {
        Optional<Bundles> bundles = bundleRepository.findById(id);

        BundlesDto bundlesDTOSaved = modelMapper.map(bundles.get(), BundlesDto.class);

        Optional<BundlesDto> bundlesDTOOptional = Optional.ofNullable(bundlesDTOSaved);

        return bundlesDTOOptional;
    }

    @Override
    public BundlesDto saveBundle(BundlesDto newBundle) {
        Bundles bundle = modelMapper.map(newBundle, Bundles.class);

        Bundles bundleSaved = bundleRepository.save(bundle);

        BundlesDto bundleSavedDTO = modelMapper.map(bundleSaved, BundlesDto.class);

        return bundleSavedDTO;
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
    public BundlesDto modifyBundle(BundlesDto bundlesDTO) {
        Bundles bundle = modelMapper.map(bundlesDTO, Bundles.class);

        Bundles bundleSaved = bundleRepository.save(bundle);

        BundlesDto bundleSavedDTO = modelMapper.map(bundleSaved, BundlesDto.class);

        return bundleSavedDTO;
    }
}
