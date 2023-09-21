package com.proyectointegradorequipo3.proyectointegradorEquipo3.Mapper;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Booking;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.DrinkQuantity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.UserEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.BookingDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.DrinkQuantityDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import java.util.ArrayList;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public class BookingMapper {

    public static DrinkQuantityDto toDto(DrinkQuantity drinkQuantity) {
        DrinkQuantityDto dto = new DrinkQuantityDto();
        dto.setId(drinkQuantity.getId());
        dto.setDrinkId(drinkQuantity.getDrinkId());
        dto.setQuantity(drinkQuantity.getQuantity());
        return dto;
    }

    public static BookingDto toDto(Booking booking) {
        BookingDto dto = new BookingDto();

        dto.setId(booking.getId());
        dto.setUser(booking.getUser() != null ? booking.getUser().getId() : null);
        dto.setBundle(booking.getBundle() != null ? booking.getBundle().getId() : null);
        dto.setDate(booking.getDate());
        dto.setDiners(booking.getDiners());
        dto.setPrice(booking.getPrice());
        dto.setComment(booking.getComment());

        if (booking.getDrinks() != null) {
            dto.setDrinks(booking.getDrinks().stream().map(BookingMapper::toDto).collect(Collectors.toList()));
        } else {
            dto.setDrinks(new ArrayList<>());
        }

        if (booking.getBundle() != null) {
            dto.setBundleName(booking.getBundle().getName());
        }

        return dto;
    }
}





