package com.proyectointegradorequipo3.proyectointegradorEquipo3.Mapper;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Plate;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BundleDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.PlateDto;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BundleMapper {

    BundleDto toDto(Bundle bundle);

    List<BundleDto> toDtoList(List<Bundle> bundles);

    PlateDto toPlateDto(Plate plate);

    default List<PlateDto> toPlateDtoList(List<Plate> plates) {
        if (plates == null) return null;
        return plates.stream()
                .map(this::toPlateDto)
                .collect(Collectors.toList());
    }
}
