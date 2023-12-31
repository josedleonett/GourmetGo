package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.RatingUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDtoDetailUser;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleForCardDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.BundleServiceImpl;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.CategoryServiceImpl;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.CharacteristicServiceImpl;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.GetAllServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.BUNDLE_URI;

@RestController
@RequestMapping(BUNDLE_URI)
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class BundleController {

    private final BundleServiceImpl bundleService;

    private final GetAllServiceImpl getAllService;
    private final CategoryServiceImpl categoryService;

    private final CharacteristicServiceImpl characteristicService;

    //====================Create====================//
    @PostMapping(path = "/create")
    public ResponseEntity<Void> createBundle(@ModelAttribute @Valid BundleCreateRequest request,
                                             @RequestPart(required = false) MultipartFile image,
                                             @RequestPart(required = false) List<MultipartFile> galleryImages)
            throws Exception {

        if (image != null) {
            request.setImage(image);
        }

        if (galleryImages != null && !galleryImages.isEmpty()) {
            request.setGalleryImages(galleryImages);
        }

        Long bundleId = bundleService.saveBundle(request);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(bundleId).toUri();
        return ResponseEntity.created(location).build();
    }


    //====================Display all====================//

    @GetMapping
    public ResponseEntity<List<BundleDto>> getAllBundles() {
        List<BundleDto> bundleDtos = getAllService.searchAllBundles();
        return ResponseEntity.ok(bundleDtos);
    }


    @GetMapping("/byUser/{userId}")
    public ResponseEntity<List<BundleForCardDto>> getFavoriteBundlesForCards(@PathVariable Long userId) {
        List<BundleForCardDto> bundles = bundleService.searchBundlesForCards(userId);
        return ResponseEntity.ok(bundles);
    }

    @GetMapping("{userId}/bundleDetail/{bundleId}")
    public ResponseEntity<BundleDtoDetailUser> getFavoriteBundleById(@PathVariable Long userId, @PathVariable Long bundleId) {
        BundleDtoDetailUser bundle = bundleService.searchBundleByIdAndUser(userId, bundleId);
        return ResponseEntity.ok(bundle);
    }

    //====================Display all for card====================//

    @GetMapping("/getAllForCard")
    public ResponseEntity<List<BundleForCardDto>> getAllBundlesForCard() {
        List<BundleForCardDto> bundleDtos = getAllService.searchAllBundlesForCards();
        return ResponseEntity.ok(bundleDtos);
    }

    //====================Display all by category id====================//

    @GetMapping("/byCategory/{id}")
    public ResponseEntity<List<Long>> getAllBundlesByCategory(@PathVariable Long id) {
        List<Long> bundles = categoryService.getBundleIdsByCategoryId(id);
        return ResponseEntity.ok(bundles);
    }


    //====================Display all by characteristic id====================//

    @GetMapping("/byCharacteristic/{id}")
    public ResponseEntity<List<Long>> getAllBundlesByCharacteristic(@PathVariable Long id) {
        List<Long> bundles = characteristicService.getBundleIdsByCharacteristicId(id);
        return ResponseEntity.ok(bundles);
    }


    //====================Get one by id====================//

    @GetMapping("/{id}")
    public ResponseEntity<BundleDto> getBundleById(@PathVariable Long id) {
        BundleDto bundleDto = bundleService.searchBundleDtoById(id);
        return ResponseEntity.ok(bundleDto);
    }

    //====================Get one by id For cards====================//

    @GetMapping("/getByIdForCard/{id}")
    public ResponseEntity<BundleForCardDto> getBundleByIdForCards(@PathVariable Long id) {
        BundleForCardDto bundleDto = bundleService.searchBundleDtoByIdForCards(id);
        return ResponseEntity.ok(bundleDto);
    }

    //====================Update====================//

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateBundle(@PathVariable Long id, @ModelAttribute @Valid BundleUpdateRequest request) {
        bundleService.modifyBundle(id, request);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/rating/{id}")
    public ResponseEntity<Void> updateRating(@PathVariable Long id, RatingUpdateRequest request) {
        bundleService.ratingModify(id, request);
        return ResponseEntity.noContent().build();
    }


    //====================Deletes====================//
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBundle(@PathVariable Long id) {
        bundleService.deleteBundleById(id);
        return ResponseEntity.noContent().build();
    }




}
