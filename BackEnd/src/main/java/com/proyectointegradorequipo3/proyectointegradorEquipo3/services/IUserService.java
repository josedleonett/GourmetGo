package com.proyectointegradorequipo3.proyectointegradorEquipo3.services;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.UserUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.UserDto;

import java.util.List;

public interface IUserService {
    List<UserDto> searchAllUser();

    UserDto searchUserById(Long id);

    UserDto searchUserByEmail(String email);

    void deleteUserById(Long id) throws Exception;

    void modifyUser(Long id, UserUpdateRequest user) throws Exception;
}
