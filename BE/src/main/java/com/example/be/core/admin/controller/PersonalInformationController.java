package com.example.be.core.admin.controller;

import com.example.be.core.admin.service.PersonalInformationService;
import com.example.be.infrastructure.constant.MappingConstants;
import com.example.be.utils.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping(MappingConstants.ADMIN_PERSONAL_INFORMATION)
@RequiredArgsConstructor
public class PersonalInformationController {

    private final PersonalInformationService personalInformationService;

    @GetMapping
    public ResponseEntity<?> getPersonalInformation() {
        return Helper.createResponseEntity(personalInformationService.getPersonalInformation());
    }

}
