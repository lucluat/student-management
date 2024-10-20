package com.example.be.core.admin.service.impl;

import com.example.be.core.admin.model.request.PersonalRequest;
import com.example.be.core.admin.repository.AdPersonalInformationRepository;
import com.example.be.core.admin.repository.AdStudentRepository;
import com.example.be.core.admin.service.PersonalInformationService;
import com.example.be.core.common.base.ResponseObject;
import com.example.be.entity.PersonalInformation;
import com.example.be.entity.Student;
import com.example.be.infrastructure.constant.EntityStatus;
import com.example.be.infrastructure.constant.Gender;
import com.example.be.infrastructure.constant.Relationship;
import com.example.be.repository.PersonalInformationRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Validated
public class PersonalInformationServiceImpl implements PersonalInformationService {

    private final AdPersonalInformationRepository personalInformationRepository;

    private final AdStudentRepository studentRepository;

    @Override
    public ResponseObject<?> getPersonalInformation(String studentId) {
        return new ResponseObject<>(
                personalInformationRepository.getPersonalInformation(studentId),
                HttpStatus.OK,
                "Lấy danh sách thân nhân thành công!"
        );
    }

    @Override
    public ResponseObject<?> addPersonal(@Valid PersonalRequest request) {
        Optional<Student> student = studentRepository.findById(request.getStudentId());
        if (student.isEmpty()) {
            return new ResponseObject<>(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Sinh viên không tồn tại!"
            );
        }
        PersonalInformation personalInformation = PersonalInformation.builder()
                .birthDate(request.getBirthDate())
                .fullName(request.getName().trim())
                .gender(request.getGender() == 0 ? Gender.MALE : Gender.FEMALE)
                .relationship(getRelationship(request.getRelationship()))
                .student(student.get())
                .build();

        PersonalInformation savedPersonalInformation = personalInformationRepository.save(personalInformation);
        return new ResponseObject<>(savedPersonalInformation, HttpStatus.OK, "Thêm thành công!");

    }

    @Override
    public ResponseObject<?> updatePersonal(PersonalRequest request) {
        Optional<PersonalInformation> personalInformation
                = personalInformationRepository.findById(request.getIdUpdate());
        if (personalInformation.isEmpty()) {
            return new ResponseObject<>(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Nhân thân không tồn tại!"
            );
        }
        personalInformation.get().setBirthDate(request.getBirthDate());
        personalInformation.get().setFullName(request.getName().trim());
        personalInformation.get().setGender(request.getGender() == 0 ? Gender.MALE : Gender.FEMALE);
        personalInformation.get().setRelationship(getRelationship(request.getRelationship()));
        PersonalInformation savedPersonalInformation = personalInformationRepository.save(personalInformation.get());
        return new ResponseObject<>(savedPersonalInformation, HttpStatus.OK, "Sửa thành công!");
    }

    @Override
    public ResponseObject<?> deletePersonal(String personalId) {
        Optional<PersonalInformation> personalInformation = personalInformationRepository.findById(personalId);
        if (personalInformation.isEmpty()) {
            return new ResponseObject<>(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Nhân thân không tồn tại!"
            );
        }
        personalInformation.get().setStatus(EntityStatus.INACTIVE);
        PersonalInformation save = personalInformationRepository.save(personalInformation.get());
        return new ResponseObject<>(save, HttpStatus.OK, "Xoá thành công!");
    }

    private Relationship getRelationship(Integer relationship) {
        switch (relationship) {
            case 0:
                return Relationship.FATHER;
            case 1:
                return Relationship.MOTHER;
            case 2:
                return Relationship.BROTHER;
            case 3:
                return Relationship.SISTER;
            case 4:
                return Relationship.YOUNGER_SIBLING;
            default:
                return null;
        }
    }

}
