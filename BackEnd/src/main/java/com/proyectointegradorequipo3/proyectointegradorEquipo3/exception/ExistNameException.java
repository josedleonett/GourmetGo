package com.proyectointegradorequipo3.proyectointegradorEquipo3.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExistNameException extends RuntimeException{
    public ExistNameException(String name) {
        super("There is a resource with the name: " + name);
    }
}
