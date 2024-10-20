package com.example.be.core.admin.service;

import com.example.be.core.admin.model.request.StudentFilterRequest;
import com.example.be.core.admin.model.request.StudentRequest;
import com.example.be.core.common.base.ResponseObject;
import jakarta.validation.Valid;

public interface StudentService {

    ResponseObject<?> getStudents(StudentFilterRequest request);

    ResponseObject<?> addStudents(@Valid StudentRequest request);

    ResponseObject<?> updateStudent(@Valid StudentRequest request);

    ResponseObject<?> deleteStudent(String id);
}
