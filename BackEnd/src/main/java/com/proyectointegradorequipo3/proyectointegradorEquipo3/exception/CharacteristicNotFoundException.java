package com.proyectointegradorequipo3.proyectointegradorEquipo3.exception;

public class CharacteristicNotFoundException extends RuntimeException {

    public CharacteristicNotFoundException(String message) {
        super(message);
    }

    public CharacteristicNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CharacteristicNotFoundException(Throwable cause) {
        super(cause);
    }
}
