package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;

    private String name;

    private String lastName;

    private String email;

    private String role;

    private boolean isConfirmed;

    private int emailResendAttempts = 0;

    private LocalDateTime lastEmailResendDate;

}
