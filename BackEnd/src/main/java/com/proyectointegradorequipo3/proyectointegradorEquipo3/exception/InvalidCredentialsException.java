package com.proyectointegradorequipo3.proyectointegradorEquipo3.exception;

public class InvalidCredentialsException extends RuntimeException{
    public InvalidCredentialsException() {
        super("The provided credentials are incorrect. Please check and try again.");
    }

    public InvalidCredentialsException(String message) {
        super(message);
    }
}
