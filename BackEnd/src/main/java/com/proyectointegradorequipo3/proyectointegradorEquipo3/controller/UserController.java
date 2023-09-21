package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.UserUpdateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.UserDto;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.UserNotFoundException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

import static com.proyectointegradorequipo3.proyectointegradorEquipo3.api.ApiConstants.USER_URI;

@RestController
@RequestMapping(USER_URI)
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class UserController {

    private final UserServiceImpl userService;


    //====================Display all====================//
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUser() {
        List<UserDto> userDtos = userService.searchAllUser();
        return ResponseEntity.ok(userDtos);
    }

    //====================Get one by id====================//
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto userDto = userService.searchUserById(id);
        return ResponseEntity.ok(userDto);
    }

    //====================Get one by email====================//
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/searchByEmail")
    public ResponseEntity<UserDto> searchUserByEmail(@RequestParam String email) {
        UserDto userDto = userService.searchUserByEmail(email);

        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        }

        throw new UserNotFoundException("User with email '" + email + "' not found");
    }


    //====================Get one by name or lastname====================//
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/searchByNameOrLastName")
    public ResponseEntity<List<UserDto>> searchUserByName(@RequestParam String name, @RequestParam String lastName) {
        List<UserDto> userDtos = userService.searchUsersByNameOrLastName(name, lastName);

        return ResponseEntity.ok(userDtos);
    }

    //===================Delete===================//
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable Long id) throws Exception {
        userService.deleteUserById(id);
    }

    //====================Update====================//
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void modifyUser(@PathVariable Long userId, @ModelAttribute UserUpdateRequest updateRequest) throws RoleNotFoundException {
        userService.modifyUser(userId, updateRequest);
    }


    //====================Add favorite====================//
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PostMapping("/{userId}/favorites/{bundleId}")
    public synchronized ResponseEntity<Void> addBundleToFavorites(
            @PathVariable Long userId,
            @PathVariable Long bundleId) {
        userService.addBundleToFavorites(userId, bundleId);
        return ResponseEntity.ok().build();
    }


    //====================Del favorite====================//
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @DeleteMapping("/{userId}/favorites/{bundleId}")
    public synchronized  ResponseEntity<Void> removeBundleFromFavorites(
            @PathVariable Long userId,
            @PathVariable Long bundleId) {
        userService.removeBundleFromFavorites(userId, bundleId);
        return ResponseEntity.ok().build();
    }


}
