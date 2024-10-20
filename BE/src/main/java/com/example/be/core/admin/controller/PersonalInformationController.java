package com.example.be.core.admin.controller;

import com.example.be.core.admin.model.request.PersonalRequest;
import com.example.be.core.admin.service.PersonalInformationService;
import com.example.be.infrastructure.constant.MappingConstants;
import com.example.be.utils.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(MappingConstants.ADMIN_PERSONAL_INFORMATION)
@RequiredArgsConstructor
public class PersonalInformationController {

    private final PersonalInformationService personalInformationService;

    @GetMapping("/{studentId}")
    public ResponseEntity<?> getPersonalInformation(@PathVariable("studentId") String studentId) {
        return Helper.createResponseEntity(personalInformationService.getPersonalInformation(studentId));
    }

    @PostMapping
    public ResponseEntity<?> addPersonal(@RequestBody PersonalRequest request){
        return Helper.createResponseEntity(personalInformationService.addPersonal(request));
    }

    @PutMapping
    public ResponseEntity<?> updatePersonal(@RequestBody PersonalRequest request){
        return Helper.createResponseEntity(personalInformationService.updatePersonal(request));
    }

    @DeleteMapping("/{personalId}")
    public ResponseEntity<?> deletePersonal(@PathVariable("personalId") String personalId){
        return Helper.createResponseEntity(personalInformationService.deletePersonal(personalId));
    }
}
