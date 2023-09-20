package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.*;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.RatingUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.*;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.*;
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

import java.text.DecimalFormat;
import java.util.*;
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

    private final IReviewRepository reviewRepository;

    private final ICharacteristicRepository characteristicRepository;

    private final ICategoryRepository categoryRepository;

    private final IUserRepository userRepository;

    private final IBookingRepository bookingRepository;

    private final ModelMapper mapper;

    private final S3Service s3Service;

    DecimalFormat df = new DecimalFormat("#.#");

    Logger logger = Logger.getLogger(BundleServiceImpl.class.getName());

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Cacheable(value = "searchBundleDtoById", unless = "#result == null")
    public BundleDto searchBundleDtoById(Long id) {
        Bundle bundle = bundleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        BundleDto dto = modelMapper.map(bundle, BundleDto.class);
        List<Review> reviews = reviewRepository.findByBundleId(id);
        List<ReviewDto> reviewDtos = reviews.stream()
                .map(review -> mapper.map(review, ReviewDto.class))
                .collect(Collectors.toList());
        dto.setReviews(reviewDtos);
        dto.setRating((calculateAverageRating(reviewDtos)));
        return dto;
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
        List<Review> reviews = reviewRepository.findByBundleId(bundleId);
        List<ReviewDto> reviewDtos = reviews.stream()
                .map(review -> mapper.map(review, ReviewDto.class))
                .collect(Collectors.toList());
        dto.setReviews(reviewDtos);

        dto.getReviews().stream().map(review -> review.getRating());

        boolean canReview = false;
        Optional<Booking> bookingOpt = bookingRepository.findTopByUserIdAndBundleIdOrderByDateDesc(userId, bundleId);
        if (bookingOpt.isPresent() && bookingOpt.get().getReview() == null) {
            canReview = true;
        }


        dto.setCanUserReview(canReview);
        dto.setRating(calculateAverageRating(reviewDtos));

        dto.setPrice(calculateTotalPrice(bundle));

        return dto;
    }

    public double calculateTotalPrice(Bundle bundle) {
        double provisionalPrice = 0.;

        provisionalPrice += bundle.getStarter().stream()
                .mapToDouble(Plate::getPrice)
                .sum();

        provisionalPrice += bundle.getMainCourse().stream()
                .mapToDouble(Plate::getPrice)
                .sum();

        provisionalPrice += bundle.getDesserts().stream()
                .mapToDouble(Plate::getPrice)
                .sum();

        return provisionalPrice;
    }

    public double calculateAverageRating(List<ReviewDto> reviews) {
        double average = reviews.stream()
                .mapToDouble(ReviewDto::getRating)
                .average()
                .orElse(0.0);

        return roundToOneDecimal(average);
    }
    double roundToOneDecimal(double value) {
        return Math.round(value * 10.0) / 10.0;
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
    public Long saveBundle(BundleCreateRequest request) throws Exception {
        validateRequest(request);
        Map<String, CompletableFuture<?>> futureMap = initFutures(request);
        waitForAllFutures(futureMap);
        Bundle newBundle = constructBundle(request, futureMap);
        validateBundleName(newBundle.getName());
        save(newBundle);
        return newBundle.getId();
    }

    private void validateRequest(BundleCreateRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is mandatory!");
        }
    }

    private Map<String, CompletableFuture<?>> initFutures(BundleCreateRequest request) {
        Map<String, CompletableFuture<?>> futures = new HashMap<>();

        if (request.getStarter() != null) {
            futures.put("starter", CompletableFuture.supplyAsync(() ->
                    plateService.validateAndGetPlates(request.getStarter(), "Starter")));
        }

        if (request.getMainCourse() != null) {
            futures.put("mainCourse", CompletableFuture.supplyAsync(() ->
                    plateService.validateAndGetPlates(request.getMainCourse(), "Main course")));
        }

        if (request.getDesserts() != null) {
            futures.put("desserts", CompletableFuture.supplyAsync(() ->
                    plateService.validateAndGetPlates(request.getDesserts(), "Dessert")));
        }

        if (request.getDrinks() != null) {
            futures.put("drinks", CompletableFuture.supplyAsync(() ->
                    drinkService.validateAndGetDrink(request.getDrinks())));
        }

        if (request.getCharacteristics() != null) {
            futures.put("characteristics", CompletableFuture.supplyAsync(() ->
                    characteristicRepository.findByNameIn(request.getCharacteristics())));
        }

        if (request.getCategories() != null) {
            futures.put("categories", CompletableFuture.supplyAsync(() ->
                    categoryRepository.findByNameIn(request.getCategories())));
        }

        if (request.getImage() != null) {
            futures.put("keyImage", CompletableFuture.supplyAsync(() ->
                    s3Service.putObject(request.getImage())));
        }

        if (request.getGalleryImages() != null) {
            futures.put("galleryKeys", CompletableFuture.supplyAsync(() ->
                    request.getGalleryImages().stream().map(s3Service::putObject).collect(Collectors.toList())));
        }

        return futures;
    }

    private void waitForAllFutures(Map<String, CompletableFuture<?>> futureMap) throws Exception {
        CompletableFuture.allOf(futureMap.values().toArray(new CompletableFuture[0])).join();
    }

    private Bundle constructBundle(BundleCreateRequest request, Map<String, CompletableFuture<?>> futureMap) throws Exception {
        double provisionalPrice = 0.;
        Bundle.BundleBuilder builder = Bundle.builder()
                .name(request.getName())
                .description(request.getDescription())
                .rating(0.0)
                .terms(request.getTerms());

        if (futureMap.containsKey("starter"))
            builder.starter((List<Plate>) futureMap.get("starter").get());

        if (futureMap.containsKey("mainCourse"))
            builder.mainCourse((List<Plate>) futureMap.get("mainCourse").get());

        if (futureMap.containsKey("desserts"))
            builder.desserts((List<Plate>) futureMap.get("desserts").get());

        if (futureMap.containsKey("drinks"))
            builder.drinks((List<Drink>) futureMap.get("drinks").get());

        if (futureMap.containsKey("characteristics"))
            builder.characteristics((List<Characteristic>) futureMap.get("characteristics").get());

        if (futureMap.containsKey("categories"))
            builder.categories((List<Category>) futureMap.get("categories").get());

        if (futureMap.containsKey("keyImage"))
            builder.image((String) futureMap.get("keyImage").get());

        if (futureMap.containsKey("galleryKeys"))
            builder.galleryImages((List<String>) futureMap.get("galleryKeys").get());

        return builder.build();
    }

    private void validateBundleName(String name) {
        existsName(name);
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

        if (request.getCategories() != null) {List<Category> categories = categoryRepository.findByNameIn(request.getCategories());
            existingBundle.setCategories(categories);
        }

        if (request.getCharacteristics() != null) {List<Characteristic> characteristics = characteristicRepository.findByNameIn(request.getCharacteristics());
            existingBundle.setCharacteristics(characteristics);
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
            existingBundle.setTotalRates(request.getTotalRates());
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

        if (bundle.getImage() != null) {
            s3Service.deleteObject(bundle.getImage());
        }

        if (bundle.getGalleryImages() != null && !bundle.getGalleryImages().isEmpty()) {
            List<CompletableFuture<Void>> futures = bundle.getGalleryImages().stream()
                    .filter(Objects::nonNull)
                    .map(image -> CompletableFuture.runAsync(() -> s3Service.deleteObject(image)))
                    .collect(Collectors.toList());
            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        }

        bundleRepository.deleteUserFavoriteBundlesByBundleId(id);
        bundleRepository.deleteById(id);
    }


    //===================Util===================//

    private void existsName(String name) {
        Bundle existingBundle = bundleRepository.findByName(name);
        if (existingBundle != null ) {
            throw new ExistNameException(name);
        }
    }
    private void existsName(String name, Long excludeId) {
        Bundle existingBundle = bundleRepository.findByName(name);
        if (existingBundle != null && !existingBundle.getId().equals(excludeId)) {
            throw new ExistNameException(name);
        }
    }

}
