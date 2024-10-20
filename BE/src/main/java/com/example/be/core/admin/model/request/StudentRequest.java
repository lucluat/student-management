package com.example.be.core.admin.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StudentRequest {

    private String idUpdate;

    @NotBlank(message = "Họ và tên không được trống!")
    @Length(min = 5,max = 250,message = "Họ và tên trong khoảng từ 5 đến 250 ký tự!")
    private String name;

    @NotNull(message = "Họ và tên không được trống!")
    private Integer gender;

    @NotNull(message = "Họ và tên không được trống!")
    private Double gpa;

    @NotBlank(message = "Ngày sinh không được trống!")
    private String birthDate;

}
