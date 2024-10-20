package com.example.be.core.admin.model.request;

import com.example.be.core.common.base.PageableRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentFilterRequest extends PageableRequest {

    private String keyword;

    private Double minGPA;

    private Double maxGPA;

    private Integer gender;

}
