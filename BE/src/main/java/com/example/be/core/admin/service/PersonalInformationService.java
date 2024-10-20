package com.example.be.core.admin.service;

import com.example.be.core.admin.model.request.PersonalRequest;
import com.example.be.core.common.base.ResponseObject;
import jakarta.validation.Valid;

public interface PersonalInformationService {

    ResponseObject<?> getPersonalInformation(String studentId);

    ResponseObject<?> addPersonal(@Valid PersonalRequest request);

    ResponseObject<?> updatePersonal(@Valid PersonalRequest request);

    ResponseObject<?> deletePersonal(String personalId);

}
