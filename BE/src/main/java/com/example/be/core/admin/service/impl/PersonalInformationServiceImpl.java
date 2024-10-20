package com.example.be.core.admin.service.impl;

import com.example.be.core.admin.repository.AdPersonalInformationRepository;
import com.example.be.core.admin.service.PersonalInformationService;
import com.example.be.core.common.base.ResponseObject;
import com.example.be.repository.PersonalInformationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonalInformationServiceImpl implements PersonalInformationService {

    private final AdPersonalInformationRepository personalInformationRepository;

    @Override
    public ResponseObject<?> getPersonalInformation() {
        return new ResponseObject<>(
                personalInformationRepository.getPersonalInformation(),
                HttpStatus.OK,
                "Lấy danh sách thân nhân thành công!"
        );
    }
}
