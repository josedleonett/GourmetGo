package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.BundleCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.BundleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.BUNDLE_URI;

@RestController
@RequestMapping(BUNDLE_URI)
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class BundleController {

    private final BundleServiceImpl bundleService;

    //====================Create====================//

    @PostMapping(path = "/create")
    public ResponseEntity<Void> createBundle(@ModelAttribute @Valid BundleCreateRequest request,
                                             @RequestPart MultipartFile bundleImage,
                                             @RequestPart List<MultipartFile> galleryImages) {
        request.setBundleImage(bundleImage);
        request.setGalleryImages(galleryImages);

        Long bundleId = bundleService.saveBundle(request);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(bundleId).toUri();
        return ResponseEntity.created(location).build();
    }

    //====================Display all====================//

    @GetMapping
    public ResponseEntity<List<BundleDto>> getAllBundles() {
        List<BundleDto> bundleDtos = bundleService.searchAllBundles();
        return ResponseEntity.ok(bundleDtos);
    }

    //====================Get one by id====================//

    @GetMapping("/{id}")
    public ResponseEntity<BundleDto> getBundleById(@PathVariable Long id) {
        BundleDto bundleDto = bundleService.searchBundleDtoById(id);
        return ResponseEntity.ok(bundleDto);
    }

    //====================Update====================//

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateBundle(@PathVariable Long id, @RequestBody @Valid BundleUpdateRequest request) {
        bundleService.modifyBundle(id, request);
        return ResponseEntity.noContent().build();
    }


    //====================Deletes====================//

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBundle(@PathVariable Long id) {
        bundleService.deleteBundleById(id);
        return ResponseEntity.noContent().build();
    }


}
