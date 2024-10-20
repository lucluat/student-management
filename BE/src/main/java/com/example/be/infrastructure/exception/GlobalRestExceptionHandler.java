package com.example.be.infrastructure.exception;

import com.example.be.core.common.base.ResponseObject;
import com.example.be.utils.Helper;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Path;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalRestExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handlerException(Exception ex) {
        if (ex instanceof RestApiException) {
            ex.printStackTrace(System.out);
            log.warn(ex.getMessage());
            ApiError apiError = new ApiError(ex.getMessage());
            return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
        } else if (ex instanceof ConstraintViolationException) {
            Set<ConstraintViolation<?>> violations = ((ConstraintViolationException) ex).getConstraintViolations();
            List<ErrorModel> errors = violations.stream()
                    .map(violation ->
                            new ErrorModel(getPropertyName(violation.getPropertyPath()), violation.getMessage()))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        } else if (ex instanceof ForbiddenException) {
            ex.printStackTrace(System.out);
            log.warn(ex.getMessage());
            ApiError apiError = new ApiError(ex.getMessage());
            return new ResponseEntity<>(apiError, HttpStatus.FORBIDDEN);
        } else {
            ex.printStackTrace(System.out);
            log.warn(ex.getMessage());
            return Helper.createResponseEntity(
                    ResponseObject.errorForward(
                            "Internal Server Error",
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
            );
        }
    }

    public String getPropertyName(Path path) {
        String pathStr = path.toString();
        String[] comps = pathStr.split("\\.");
        if (comps.length > 0) {
            return comps[comps.length - 1];
        } else {
            return pathStr;
        }
    }

}
