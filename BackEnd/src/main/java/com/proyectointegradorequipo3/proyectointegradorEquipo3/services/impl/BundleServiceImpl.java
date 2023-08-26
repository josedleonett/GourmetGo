package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.Mapper.BundleMapper;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.*;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICategoryRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICharacteristicRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IBundleService;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.S3Service;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BundleServiceImpl implements IBundleService {

    private static final String NAME = "Bundle";
    private final IBundleRepository bundleRepository;

    private final PlateServiceImpl plateService;

    private final DrinkServiceImpl drinkService;

    private final ICharacteristicRepository characteristicRepository;

    private final ICategoryRepository categoryRepository;

    private final ModelMapper mapper;

    private final S3Service s3Service;

    Logger logger = Logger.getLogger(BundleServiceImpl.class.getName());

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BundleMapper bundleMapper;

    @Cacheable(value = "searchAllBundles", unless = "#result == null || #result.isEmpty()")
    public List<BundleDto> searchAllBundles() {
        List<Bundle> bundles = bundleRepository.findAll();
        return bundleMapper.toDtoList(bundles);
    }

    @Override
    @Cacheable(value = "searchBundleDtoById", unless = "#result == null")
    public BundleDto searchBundleDtoById(Long id) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        return modelMapper.map(bundle, BundleDto.class);
    }

    @Cacheable(value = "searchBundleDtoByIdForCards", unless = "#result == null")
    public BundleDto searchBundleDtoByIdForCards(Long id) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        BundleDto bundleDto = new BundleDto();

        bundleDto.setId(bundle.getId());
        bundleDto.setName(bundle.getName());
        bundleDto.setDescription(bundle.getDescription());
        bundleDto.setImage(bundle.getImage());
        bundleDto.setGalleryImages(bundle.getGalleryImages());
        bundleDto.setRating(bundle.getRating());
        return bundleDto;
    }

    @Cacheable(value = "searchAllBundlesForCards", unless = "#result == null || #result.isEmpty()")
    public List<BundleDto> searchAllBundlesForCards() {
        List<Bundle> bundles = bundleRepository.findAll();
        return bundles.stream()
                .map(bundle -> {
                    BundleDto bundleDto = new BundleDto();

                    bundleDto.setId(bundle.getId());
                    bundleDto.setName(bundle.getName());
                    bundleDto.setDescription(bundle.getDescription());
                    bundleDto.setImage(bundle.getImage());
                    bundleDto.setGalleryImages(bundle.getGalleryImages());
                    bundleDto.setRating(bundle.getRating());
                    return bundleDto;
                })
                .collect(Collectors.toList());
    }


    //===================Create===================//
    @Override
    @Transactional
    @CacheEvict(value = {"searchAllBundles","searchBundleDtoById","searchBundleDtoByIdForCards","searchAllBundlesForCards"}, allEntries = true, beforeInvocation = false)
    public Long saveBundle(BundleCreateRequest request) {
        List<Plate> starter = plateService.validateAndGetPlates(request.getStarter(), "Starter");
        List<Plate> mainCourse = plateService.validateAndGetPlates(request.getMainCourse(), "Main course");
        List<Plate> dessert = plateService.validateAndGetPlates(request.getDesserts(), "Dessert");

        List<Drink> drinks = drinkService.validateAndGetDrink(request.getDrinks());

        List<Characteristic> characteristics = characteristicRepository.findAllById(request.getCharacteristics());

        List<Category> categories = categoryRepository.findAllById(request.getCategories());

        String keyImage = s3Service.putObject(request.getImage());
        List<String> keys = request.getGalleryImages().stream()
                .map(s3Service::putObject)
                .collect(Collectors.toList());

        Bundle newBundle = Bundle.builder()
                .name(request.getName())
                .description(request.getDescription())
                .image(keyImage)
                .galleryImages(keys)
                .starter(starter)
                .mainCourse(mainCourse)
                .desserts(dessert)
                .drinks(drinks)
                .characteristics(characteristics)
                .categories(categories)
                .rating(0.0)
                .build();

        existsName(newBundle.getName(), newBundle.getId());
        save(newBundle);
        return newBundle.getId();
    }



    public void save(Bundle bundle) {
        bundleRepository.save(bundle);
    }


    //===================Update===================//
    @Override
    @Transactional
    @CacheEvict(value = {"searchAllBundles","searchBundleDtoById","searchBundleDtoByIdForCards","searchAllBundlesForCards"}, allEntries = true, beforeInvocation = false)
    public void modifyBundle(Long bundleId, BundleUpdateRequest request) {
        Optional<Bundle> bundleOptional = bundleRepository.findById(bundleId);

        if (!bundleOptional.isPresent()) {
            throw new EntityNotFoundException("Bundle not found with id: " + bundleId);
        }

        Bundle existingBundle = bundleOptional.get();

        if (request.getStarter() != null) {
            List<Plate> starter = plateService.validateAndGetPlates(request.getStarter(), "Starter");
            existingBundle.setStarter(starter);
        }

        if (request.getMainCourse() != null) {
            List<Plate> mainCourse = plateService.validateAndGetPlates(request.getMainCourse(), "Main course");
            existingBundle.setMainCourse(mainCourse);
        }

        if (request.getDesserts() != null) {
            List<Plate> dessert = plateService.validateAndGetPlates(request.getDesserts(), "Dessert");
            existingBundle.setDesserts(dessert);
        }

        if (request.getDrinks() != null) {
            List<Drink> drinks = request.getDrinks().stream()
                    .map(drinkService::searchDrinkByName)
                    .filter(Objects::nonNull)
                    .map(dto -> mapper.map(dto, Drink.class))
                    .collect(Collectors.toList());
            existingBundle.setDrinks(drinks);
        }

        if (request.getCategories() != null) {List<Category> categories = categoryRepository.findAllById(request.getCategories());
            existingBundle.setCategories(categories);
        }

        if (request.getImage() != null) {
            String keyImage = s3Service.putObject(request.getImage());
            existingBundle.setImage(keyImage);
        }

        if (request.getGalleryImages() != null) {
            List<String> keys = request.getGalleryImages().stream()
                    .map(s3Service::putObject)
                    .collect(Collectors.toList());
            existingBundle.setGalleryImages(keys);
        }

        if (request.getName() != null) {
            existingBundle.setName(request.getName());
            existsName(existingBundle.getName(), existingBundle.getId());
        }

        if (request.getDescription() != null) {
            existingBundle.setDescription(request.getDescription());
        }

        bundleRepository.save(existingBundle);
    }


    //===================Delete===================//
    @Override
    @Transactional
    @CacheEvict(value = {"searchAllBundles","searchBundleDtoById","searchBundleDtoByIdForCards","searchAllBundlesForCards"}, allEntries = true, beforeInvocation = false)
    public void deleteBundleById(Long id) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        s3Service.deleteObject(bundle.getImage());
        for (String image : bundle.getGalleryImages()) {
            s3Service.deleteObject(image);
        }
        bundleRepository.delete(bundle);
    }

    //===================Util===================//
    private void existsName(String name, Long excludeId) {
        Bundle existingBundle = bundleRepository.findByName(name);
        if (existingBundle != null && !existingBundle.getId().equals(excludeId)) {
            throw new ExistNameException(name);
        }
    }

}
