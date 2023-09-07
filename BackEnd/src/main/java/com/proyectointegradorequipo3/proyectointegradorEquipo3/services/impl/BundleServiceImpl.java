package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.*;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.RatingUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDtoDetailUser;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleForCardDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICategoryRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.ICharacteristicRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IUserRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IBundleService;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.S3Service;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.exec.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
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

    private final IUserRepository userRepository;

    private final ModelMapper mapper;

    private final S3Service s3Service;

    Logger logger = Logger.getLogger(BundleServiceImpl.class.getName());

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Cacheable(value = "searchBundleDtoById", unless = "#result == null")
    public BundleDto searchBundleDtoById(Long id) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        return modelMapper.map(bundle, BundleDto.class);
    }

    public BundleDtoDetailUser searchBundleByIdAndUser(Long userId, Long bundleId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        Set<Long> favoriteBundleIds = user.getFavoriteBundles().stream()
                .map(Bundle::getId)
                .collect(Collectors.toSet());

        Bundle bundle = bundleRepository.findById(bundleId)
                .orElseThrow(() -> new ResourceNotFoundException("Bundle", bundleId));

        BundleDtoDetailUser dto = mapper.map(bundle, BundleDtoDetailUser.class);
        dto.setFavorite(favoriteBundleIds.contains(bundle.getId()));

        return dto;
    }

    public List<BundleForCardDto> searchBundlesForCards(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        Set<Long> favoriteBundleIds = user.getFavoriteBundles().stream()
                .map(Bundle::getId)
                .collect(Collectors.toSet());

        List<Bundle> allBundles = bundleRepository.findAll();

        List<BundleForCardDto> result = allBundles.stream()
                .map(bundle -> {
                    BundleForCardDto dto = mapper.map(bundle, BundleForCardDto.class);
                    dto.setFavorite(favoriteBundleIds.contains(bundle.getId()));
                    return dto;
                })
                .collect(Collectors.toList());

        return result;
    }



    @Cacheable(value = "searchBundleDtoByIdForCards", unless = "#result == null")
    public BundleForCardDto searchBundleDtoByIdForCards(Long id) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        return mapper.map(bundle, BundleForCardDto.class);
    }


    //===================Create===================//
    @Override
    @Transactional
    public Long saveBundle(BundleCreateRequest request) throws ExecutionException, InterruptedException, java.util.concurrent.ExecutionException {

        CompletableFuture<List<Plate>> starterFuture = CompletableFuture.supplyAsync(() ->
                plateService.validateAndGetPlates(request.getStarter(), "Starter"))
                .exceptionally(ex -> {
                    logger.info("Error getting starter plates: ");
                    return null;
                });

        CompletableFuture<List<Plate>> mainCourseFuture = CompletableFuture.supplyAsync(() ->
                plateService.validateAndGetPlates(request.getMainCourse(), "Main course"))
                .exceptionally(ex -> {
                    logger.info("Error getting mainCourse plates: ");
                    return null;
                });

        CompletableFuture<List<Plate>> dessertFuture = CompletableFuture.supplyAsync(() ->
                plateService.validateAndGetPlates(request.getDesserts(), "Dessert"))
                .exceptionally(ex -> {
                    logger.info("Error getting dessert plates: ");
                    return null;
                });

        CompletableFuture<List<Drink>> drinksFuture = CompletableFuture.supplyAsync(() ->
                drinkService.validateAndGetDrink(request.getDrinks()))
                .exceptionally(ex -> {
                    logger.info("Error getting drinks ");
                    return null;
                });

        CompletableFuture<List<Characteristic>> characteristicsFuture = CompletableFuture.supplyAsync(() ->
                characteristicRepository.findByNameIn(request.getCharacteristics()))
                .exceptionally(ex -> {
                    logger.info("Error getting characteristics ");
                    return null;
                });

        CompletableFuture<List<Category>> categoriesFuture = CompletableFuture.supplyAsync(() ->
                categoryRepository.findByNameIn(request.getCategories()))
                .exceptionally(ex -> {
                    logger.info("Error getting categories ");
                    return null;
                });

        CompletableFuture<String> keyImageFuture = CompletableFuture.supplyAsync(() ->
                s3Service.putObject(request.getImage()))
                .exceptionally(ex -> {
                    logger.info("Error getting image");
                    return null;
                });

        CompletableFuture<List<String>> keysFuture = CompletableFuture.supplyAsync(() ->
                request.getGalleryImages().stream()
                        .map(s3Service::putObject)
                        .collect(Collectors.toList()))
                .exceptionally(ex -> {
                    logger.info("Error getting galleryImages " + ex.getMessage());
                    return null;
                });

        CompletableFuture.allOf(starterFuture, mainCourseFuture, dessertFuture, drinksFuture,
                characteristicsFuture, categoriesFuture, keyImageFuture, keysFuture).join();

        List<Plate> starter = starterFuture.get();
        List<Plate> mainCourse = mainCourseFuture.get();
        List<Plate> dessert = dessertFuture.get();
        List<Drink> drinks = drinksFuture.get();
        List<Characteristic> characteristics = characteristicsFuture.get();
        List<Category> categories = categoriesFuture.get();
        String keyImage = keyImageFuture.get();
        List<String> keys = keysFuture.get();

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
                .terms(request.getTerms())
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
    @CacheEvict(value = {"searchBundleDtoById", "searchBundleDtoByIdForCards"}, key = "#bundleId")
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

        if (request.getTerms() != null) {
            existingBundle.setTerms(request.getTerms());
        }

        bundleRepository.save(existingBundle);
    }

    @Transactional
    @CacheEvict(value = {"searchBundleDtoById", "searchBundleDtoByIdForCards"}, key = "#bundleId")
    public void ratingModify(Long bundleId, RatingUpdateRequest request) {
        Optional<Bundle> bundleOptional = bundleRepository.findById(bundleId);

        if (!bundleOptional.isPresent()) {
            throw new EntityNotFoundException("Bundle not found with id: " + bundleId);
        }

        Bundle existingBundle = bundleOptional.get();

        if (request.getRating() != null) {
            existingBundle.setRating(request.getRating());
        }
        bundleRepository.save(existingBundle);
    }


    //===================Delete===================//
    @Override
    @Transactional
    @CacheEvict(value = {"searchBundleDtoById", "searchBundleDtoByIdForCards"}, key = "#id")
    public void deleteBundleById(Long id) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));

        s3Service.deleteObject(bundle.getImage());

        List<CompletableFuture<Void>> futures = bundle.getGalleryImages().stream()
                .map(image -> CompletableFuture.runAsync(() -> s3Service.deleteObject(image)))
                .collect(Collectors.toList());
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

        bundleRepository.deleteUserFavoriteBundlesByBundleId(id);
        bundleRepository.deleteById(id);
    }


    //===================Util===================//
    private void existsName(String name, Long excludeId) {
        Bundle existingBundle = bundleRepository.findByName(name);
        if (existingBundle != null && !existingBundle.getId().equals(excludeId)) {
            throw new ExistNameException(name);
        }
    }

}
