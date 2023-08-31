package com.proyectointegradorequipo3.proyectointegradorEquipo3.exception;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " not found with id: " + id);
    }

    public ResourceNotFoundException(String resource) {
        super("Resource not found with name: " + resource);
    }
}
