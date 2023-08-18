package com.proyectointegradorequipo3.proyectointegradorEquipo3.controller;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.ERole;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.RoleEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.UserEntity;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.LoginRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.request.UserCreateRequest;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.dto.response.AuthResponse;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.InvalidCredentialsException;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IRoleRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance.IUserRepository;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.security.jwt.JwtUtils;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private EmailService emailService;


    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserCreateRequest createUserDTO) throws IOException {

        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is already a user with that email.");
        }

        Set<String> userRoles = Optional.ofNullable(createUserDTO.getRoles()).orElse(new HashSet<>());
        userRoles.add(ERole.USER.name());

        Set<RoleEntity> roles = userRoles.stream()
                .map(roleName -> {
                    ERole eRole = ERole.valueOf(roleName);
                    return roleRepository.findByName(eRole)
                            .orElseGet(() -> {
                                RoleEntity newRole = new RoleEntity();
                                newRole.setName(eRole);
                                return roleRepository.save(newRole);
                            });
                })
                .collect(Collectors.toSet());

        UserEntity userEntity = UserEntity.builder()
                .name(createUserDTO.getName())
                .lastName(createUserDTO.getLastName())
                .password(passwordEncoder.encode(createUserDTO.getPassword()))
                .email(createUserDTO.getEmail())
                .roles(roles)
                .build();

        UUID token = UUID.randomUUID();
        userEntity.setConfirmationToken(token.toString());

        userRepository.save(userEntity);
        emailService.sendConfirmationEmail(userEntity, token.toString());

        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PostMapping("/resendConfirmationEmail")
    public ResponseEntity<?> resendConfirmationEmail(@RequestParam String email) throws IOException {

        Optional<UserEntity> optionalUser = userRepository.findByEmail(email);

        if (!optionalUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with the provided email.");
        }

        UserEntity userEntity = optionalUser.get();

        if (userEntity.isConfirmed()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The user has already confirmed their account.");
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneHourAgo = now.minusHours(1);

        if (userEntity.getLastEmailResendDate() == null || userEntity.getLastEmailResendDate().isBefore(oneHourAgo)) {
            userEntity.setEmailResendAttempts(0);
        } else if (userEntity.getEmailResendAttempts() >= 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have exceeded the maximum number of resend attempts. Please try again later.");
        }

        emailService.sendConfirmationEmail(userEntity, userEntity.getConfirmationToken());

        userEntity.setEmailResendAttempts(userEntity.getEmailResendAttempts() + 1);
        userEntity.setLastEmailResendDate(now);
        userRepository.save(userEntity);

        return ResponseEntity.ok().body("Confirmation email has been resent.");
    }



    @GetMapping("/confirm")
    @Transactional
    public RedirectView confirmRegistration(@RequestParam("token") String token) {

        Optional<UserEntity> optionalUser = userRepository.findByConfirmationToken(token);

        if (!optionalUser.isPresent()) {
            return new RedirectView("https:///error?reason=invalidToken");
        }

        UserEntity userEntity = optionalUser.get();
        userEntity.setConfirmed(true);
        userEntity.setConfirmationToken(null);
        userRepository.save(userEntity);

        return new RedirectView("https://google.com");

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {

        Optional<UserEntity> optionalUser = userRepository.findByEmailAndIsConfirmedTrue(loginRequest.getUsername());
        if (!optionalUser.isPresent()) {
            throw new InvalidCredentialsException();
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.generateAccesToken(authentication.getPrincipal().toString());
        String name = optionalUser.get().getName();
        String lastName = optionalUser.get().getLastName();
        String email = optionalUser.get().getEmail();
        return new ResponseEntity<>(new AuthResponse(token, name, lastName, email), HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String id) {
        userRepository.deleteById(Long.parseLong(id));
        return "User with id".concat(id) + " deleted.";
    }
}