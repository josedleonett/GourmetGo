package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}