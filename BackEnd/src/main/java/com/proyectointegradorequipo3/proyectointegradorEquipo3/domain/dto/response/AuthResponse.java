package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response;

import lombok.Data;

@Data
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer ";
    private String name;
    private String lastName;
    private String email;

    public AuthResponse(String accessToken, String name, String lastName, String email) {
        this.accessToken = accessToken;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
    }
}