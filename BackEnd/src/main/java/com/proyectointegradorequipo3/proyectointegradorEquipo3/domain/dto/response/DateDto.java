package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DateDto {
    private LocalDateTime date;
}
