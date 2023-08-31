package com.proyectointegradorequipo3.proyectointegradorEquipo3.Mapper;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Booking;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.UserEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BookingDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    @Mappings({
            @Mapping(target = "user", source = "user.id"),
            @Mapping(target = "bundle", source = "bundle.id")
    })
    BookingDto toDto(Booking booking);

    @Mappings({
            @Mapping(target = "user.id", source = "user"),
            @Mapping(target = "bundle.id", source = "bundle")
    })
    Booking toEntity(BookingDto bookingDto);

    List<BookingDto> toDtoList(List<Booking> bookings);

    List<Booking> toEntityList(List<BookingDto> bookingDtos);
}




