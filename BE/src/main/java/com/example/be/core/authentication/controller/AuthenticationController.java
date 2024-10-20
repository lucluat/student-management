package com.example.be.core.authentication.controller;

import com.example.be.core.authentication.service.UserService;
import com.example.be.entity.Users;
import com.example.be.infrastructure.constant.MappingConstants;
import com.example.be.utils.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(MappingConstants.API_VERSION_PREFIX)
public class AuthenticationController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        return Helper.createResponseEntity(userService.createUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        return Helper.createResponseEntity(userService.login(user));
    }

}
