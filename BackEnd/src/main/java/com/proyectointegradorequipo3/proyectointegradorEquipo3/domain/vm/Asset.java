package com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.vm;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Asset {
    private byte[] content;
    private String contentType;

}
