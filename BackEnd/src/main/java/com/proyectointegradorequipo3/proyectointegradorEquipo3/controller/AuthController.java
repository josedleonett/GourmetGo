package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.ERole;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.RoleEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.UserEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.UserCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IUserRepository userRepository;


    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserCreateRequest createUserDTO){

        Set<String> userRoles = Optional.ofNullable(createUserDTO.getRoles()).orElse(new HashSet<>());

        userRoles.add(ERole.USER.name());

        Set<RoleEntity> roles = userRoles.stream()
                .map(role -> RoleEntity.builder()
                        .name(ERole.valueOf(role))
                        .build())
                .collect(Collectors.toSet());

        UserEntity userEntity = UserEntity.builder()
                .name(createUserDTO.getName())
                .lastName(createUserDTO.getLastName())
                .password(passwordEncoder.encode(createUserDTO.getPassword()))
                .email(createUserDTO.getEmail())
                .roles(roles)
                .build();

        userRepository.save(userEntity);

        return ResponseEntity.ok(userEntity);
    }


    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String id){
        userRepository.deleteById(Long.parseLong(id));
        return "User with id".concat(id) + " deleted.";
    }
}