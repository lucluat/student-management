package com.example.be.core.admin.controller;

import com.example.be.core.admin.model.request.StudentFilterRequest;
import com.example.be.core.admin.model.request.StudentRequest;
import com.example.be.core.admin.service.StudentService;
import com.example.be.infrastructure.constant.MappingConstants;
import com.example.be.utils.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping(MappingConstants.ADMIN_STUDENT_MANAGEMENT)
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<?> getStudents(StudentFilterRequest request) {
        return Helper.createResponseEntity(studentService.getStudents(request));
    }

    @PostMapping
    public ResponseEntity<?> addStudent(@RequestBody StudentRequest request) {
        return Helper.createResponseEntity(studentService.addStudents(request));
    }

    @PutMapping
    public ResponseEntity<?> updateStudent(@RequestBody StudentRequest request) {
        return Helper.createResponseEntity(studentService.updateStudent(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable("id") String id) {
        return Helper.createResponseEntity(studentService.deleteStudent(id));
    }

}
