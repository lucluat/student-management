package com.example.be.entity;

import com.example.be.entity.base.PrimaryEntity;
import com.example.be.infrastructure.constant.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "student")
public class Student extends PrimaryEntity {

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "gender")
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "personal_infomation_id")
    private PersonalInformation personalInformation;

}
