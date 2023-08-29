package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plate;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.PlateCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.PlateUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.PlateDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ExistNameException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.PlateNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IPlateRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IPlateService;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class PlateServiceImpl implements IPlateService {

    private static final String NAME = "Plate";
    private final IPlateRepository plateRepository;
    private final S3Service s3Service;
    private final ModelMapper mapper;


    Logger logger = Logger.getLogger(PlateServiceImpl.class.getName());

    //===================Find===================//

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "searchPlateById", unless = "#result == null")
    public PlateDto searchPlateById(Long id) {
        Plate plate = plateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NAME, id));

        return mapper.map(plate, PlateDto.class);
    }

    @Override
    @Transactional(readOnly = true)
    public PlateDto searchPlateByName(String name) {

        Optional<Plate> optionalPlate = plateRepository.findByName(name);

        Plate plate = optionalPlate.orElseThrow(() -> new PlateNotFoundException("Plate with name '" + name + "' not found"));

        return mapper.map(plate, PlateDto.class);
    }

    //===================Create===================//
    @Override
    @Transactional
    public Long savePlate(PlateCreateRequest request) {
        existsName(request.getName());
        Plate newPlate = mapper.map(request, Plate.class);
        String keyImage = s3Service.putObject(request.getImage());
        newPlate.setImage(keyImage);
        save(newPlate);
        return newPlate.getId();
    }

    public void save(Plate plate) {
        plateRepository.save(plate);
    }


    //===================Update===================//

    @Override
    @Transactional
    @CacheEvict(value = "searchPlateById", key = "#id")
    public void modifyPlate(Long id, PlateUpdateRequest request) throws Exception {
        try {
            PlateDto plateDto = searchPlateById(id);

            if (request.getName() != null) {
                plateDto.setName(request.getName());
            }

            if (request.getType() != null) {
                plateDto.setType(request.getType());
            }

            if (request.getDescription() != null) {
                plateDto.setDescription(request.getDescription());
            }

            MultipartFile newImage = request.getImage();
            if (newImage != null && !newImage.isEmpty()) {
                s3Service.deleteObject(plateDto.getImage());

                String newImageUrl = s3Service.putObject(newImage);
                plateDto.setImage(newImageUrl);
            }

            Plate plate = mapper.map(plateDto, Plate.class);
            plate.setId(id);
            save(plate);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    //===================Delete===================//

    @Override
    @Transactional
    @CacheEvict(value = "searchPlateById", key = "#id")
    public void deletePlateById(Long id) {
        PlateDto plateDto = searchPlateById(id);
        Plate plate = mapper.map(plateDto, Plate.class);
        plateRepository.delete(plate);
        s3Service.deleteObject(plateDto.getImage());
    }


    //===================Util===================//
    private void existsName(String name) {
        if (plateRepository.existsByName(name)) throw new ExistNameException(name);
    }

    public List<Plate> validateAndGetPlates(List<String> plateNames, String plateType) {
        List<Plate> plates = new ArrayList<>();

        for (String plateName : plateNames) {
            PlateDto plateDto = searchPlateByName(plateName);
            if (plateDto == null) {
                throw new PlateNotFoundException(plateType + " not found: " + plateName);
            }
            plates.add(mapper.map(plateDto, Plate.class));
        }

        return plates;
    }

}