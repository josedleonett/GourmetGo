package com.proyectointegradorequipo3.proyectointegradorEquipo3;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.exception.error.InvalidCredentialsException;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalHandlerException {

    private static final Logger logger = Logger.getLogger(GlobalHandlerException.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneralError(Exception ex, WebRequest req) {
        logger.error(ex.getMessage());
        return new ResponseEntity<>("Error " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<String> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        logger.error(ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}

