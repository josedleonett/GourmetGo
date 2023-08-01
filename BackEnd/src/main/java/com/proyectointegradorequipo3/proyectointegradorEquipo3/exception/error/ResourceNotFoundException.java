package com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " not found with id: " + id);
    }
}
