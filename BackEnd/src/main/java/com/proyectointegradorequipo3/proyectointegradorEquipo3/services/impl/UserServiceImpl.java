package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Bundle;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.ERole;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.RoleEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.UserEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.UserUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.UserDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.ResourceNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.UserNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IBundleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IRoleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IUserRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements IUserService {

    private static final String NAME = "User";
    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;

    private final IBundleRepository bundleRepository;
    private final ModelMapper mapper;


    //===================Find===================//
    @Override
    public List<UserDto> searchAllUser() {
        return userRepository.findAll().stream()
                .map(user -> {
                    UserDto userDto = mapper.map(user, UserDto.class);

                    String rolesAsString = user.getRoles().stream()
                            .map(roleEntity -> roleEntity.getName().name())
                            .collect(Collectors.joining(", "));
                    userDto.setRole(rolesAsString);

                    return userDto;
                })
                .collect(Collectors.toList());
    }


    //===================BY Id===================//
    @Override
    public UserDto searchUserById(Long id) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(NAME, id));
        UserDto userDto = mapper.map(user, UserDto.class);

        String rolesAsString = user.getRoles().stream()
                .map(roleEntity -> roleEntity.getName().name())
                .collect(Collectors.joining(", "));
        userDto.setRole(rolesAsString);

        return userDto;
    }


    //===================By Email===================//
    @Override
    public UserDto searchUserByEmail(String email) {
        Optional<UserEntity> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            UserDto userDto = mapper.map(user, UserDto.class);

            String rolesAsString = user.getRoles().stream()
                    .map(roleEntity -> roleEntity.getName().name())
                    .collect(Collectors.joining(", "));
            userDto.setRole(rolesAsString);

            return userDto;
        } else {
            throw new UserNotFoundException("User with email '" + email + "' not found");
        }
    }



    //===================By Name or LastName===================//
    @Cacheable(value = "searchUsersByNameOrLastName", unless = "#result == null || #result.isEmpty()")
    public List<UserDto> searchUsersByNameOrLastName(String name, String lastName) {
        List<UserEntity> users = userRepository.findByNameOrLastName(name, lastName);

        if (users.isEmpty()){
            if (name.equals("") && !lastName.equals("")){
                throw new UserNotFoundException("User with lastname '" + lastName + "' not found");
            } else if (lastName.equals("") && !name.equals("")) {
                throw new UserNotFoundException("User with name '" + name + "' not found");
            } else if (lastName.equals("")) {
                throw new UserNotFoundException("Fields empty");
            } else {
                throw new UserNotFoundException("User with name " + name + " and lastname " + lastName + " not found");
            }
        }

        return users.stream()
                .map(user -> {
                    UserDto userDto = mapper.map(user, UserDto.class);

                    String rolesAsString = user.getRoles().stream()
                            .map(roleEntity -> roleEntity.getName().name())
                            .collect(Collectors.joining(", "));
                    userDto.setRole(rolesAsString);

                    return userDto;
                })
                .collect(Collectors.toList());
    }


    //===================Delete===================//
    @Override
     public void deleteUserById(Long id) throws Exception {
        userRepository.deleteById(id);
    }

    //===================Update===================//
    @Override
    public void modifyUser(Long userId, UserUpdateRequest updateRequest) throws RoleNotFoundException {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();

            if (updateRequest.getName() != null) {
                user.setName(updateRequest.getName());
            }
            if (updateRequest.getLastName() != null) {
                user.setLastName(updateRequest.getLastName());
            }
            if (updateRequest.getEmail() != null) {
                user.setEmail(updateRequest.getEmail());
            }
            if (updateRequest.getRole() != null) {
                ERole roleEnum = ERole.valueOf(updateRequest.getRole());
                Optional<RoleEntity> optionalRole = roleRepository.findByName(roleEnum);
                if (optionalRole.isPresent()) {
                    RoleEntity role = optionalRole.get();
                    user.getRoles().clear();
                    user.getRoles().add(role);
                } else {
                    throw new RoleNotFoundException("Role with name '" + updateRequest.getRole() + "' not found");
                }
            }
            if (updateRequest.isConfirmed() != user.isConfirmed()) {
                user.setConfirmed(updateRequest.isConfirmed());
            }

            userRepository.save(user);
        } else {
            throw new UserNotFoundException("User with id '" + userId + "' not found");
        }
    }

    //===================Add Favorite===================//
    public void addBundleToFavorites(Long userId, Long bundleId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        Bundle bundle = bundleRepository.findById(bundleId)
                .orElseThrow(() -> new ResourceNotFoundException("Bundle", bundleId));

        user.getFavoriteBundles().add(bundle);
        userRepository.save(user);
    }

    //===================Del Favorite===================//
    public void removeBundleFromFavorites(Long userId, Long bundleId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        Bundle bundle = bundleRepository.findById(bundleId)
                .orElseThrow(() -> new ResourceNotFoundException("Bundle", bundleId));

        user.getFavoriteBundles().remove(bundle);
        userRepository.save(user);
    }
}
