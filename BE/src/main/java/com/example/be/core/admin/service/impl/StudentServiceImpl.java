package com.example.be.core.admin.service.impl;

import com.example.be.core.admin.model.request.StudentFilterRequest;
import com.example.be.core.admin.model.request.StudentRequest;
import com.example.be.core.admin.repository.AdStudentRepository;
import com.example.be.core.admin.service.StudentService;
import com.example.be.core.common.base.ResponseObject;
import com.example.be.entity.Student;
import com.example.be.infrastructure.constant.EntityStatus;
import com.example.be.infrastructure.constant.Gender;
import com.example.be.utils.Helper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Validated
public class StudentServiceImpl implements StudentService {

    private final AdStudentRepository studentRepository;

    @Override
    public ResponseObject<?> getStudents(StudentFilterRequest request) {
        Pageable page = Helper.createPageable(request, "createdDate");
        return new ResponseObject<>(studentRepository.getStudents(page, request),
                HttpStatus.OK, "Lấy danh sách sinh viên thành công!");
    }

    @Override
    public ResponseObject<?> addStudents(@Valid StudentRequest request) {
        Student student = Student.builder()
                .GPA(request.getGpa())
                .gender(request.getGender() == 0 ? Gender.MALE : Gender.FEMALE)
                .fullName(request.getName().trim())
                .birthDate(request.getBirthDate())
                .build();

        Student savedStudent = studentRepository.save(student);
        return new ResponseObject<>(savedStudent,
                HttpStatus.OK, "Thêm sinh viên thành công!");
    }

    @Override
    public ResponseObject<?> updateStudent(StudentRequest request) {
        Optional<Student> student = studentRepository.findById(request.getIdUpdate());
        if (student.isEmpty()) {
            return new ResponseObject<>(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Sinh viên không tồn tại!"
            );
        }
        student.get().setFullName(request.getName().trim());
        student.get().setGender(request.getGender() == 0 ? Gender.MALE : Gender.FEMALE);
        student.get().setGPA(request.getGpa());
        student.get().setBirthDate(request.getBirthDate());
        Student savedStudent = studentRepository.save(student.get());
        return new ResponseObject<>(savedStudent, HttpStatus.OK, "Sửa thành công!");
    }

    @Override
    public ResponseObject<?> deleteStudent(String id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isEmpty()) {
            return new ResponseObject<>(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Sinh viên không tồn tại!"
            );
        }
        student.get().setStatus(EntityStatus.INACTIVE);
        Student savedStudent = studentRepository.save(student.get());
        return new ResponseObject<>(savedStudent, HttpStatus.OK, "Xoá thành công!");
    }
}
