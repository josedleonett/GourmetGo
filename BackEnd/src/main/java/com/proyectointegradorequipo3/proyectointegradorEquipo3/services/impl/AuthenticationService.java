package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.UserEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public String authenticateAndGenerateToken(String username, String password) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        UserEntity user = (UserEntity) auth.getPrincipal();
        return jwtUtils.generateAccesToken(user);
    }
}
