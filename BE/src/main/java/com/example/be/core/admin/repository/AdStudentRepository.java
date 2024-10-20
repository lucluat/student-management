package com.example.be.core.admin.repository;

import com.example.be.core.admin.model.request.StudentFilterRequest;
import com.example.be.core.admin.model.response.StudentResponse;
import com.example.be.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdStudentRepository extends StudentRepository {

    @Query(value = """
            SELECT 
                 ROW_NUMBER() OVER (ORDER BY s.id DESC ) as orderNumber,
                 s.id as Id,
                 s.full_name as name,
                 s.birth_date as birthDate,
                 s.gender as gender,
                 s.gpa as gPA
            FROM student s
            WHERE (:#{#request.keyword} IS NULL 
                    OR :#{#request.keyword} LIKE ''
                    OR s.full_name LIKE CONCAT('%', :#{#request.keyword} , '%')
                    OR s.birth_date LIKE CONCAT('%', :#{#request.keyword} , '%'))
            AND (:#{#request.gender} IS NULL OR :#{#request.gender} = s.gender)
            AND (:#{#request.minGPA} IS NULL OR  :#{#request.maxGPA} IS NULL
                 OR :#{#request.minGPA} >= :#{#request.maxGPA}
                 OR s.gpa between :#{#request.minGPA} and :#{#request.maxGPA})
            AND s.status = 0
            """,countQuery = """
            SELECT COUNT(*)
            FROM student s
            WHERE (:#{#request.keyword} IS NULL 
                   OR :#{#request.keyword} LIKE ''
                   OR s.full_name LIKE CONCAT('%', :#{#request.keyword} , '%')
                   OR s.birth_date LIKE CONCAT('%', :#{#request.keyword} , '%'))
            AND (:#{#request.gender} IS NULL OR :#{#request.gender} = s.gender)
            AND (:#{#request.minGPA} IS NULL OR  :#{#request.maxGPA} IS NULL
                OR :#{#request.minGPA} >= :#{#request.maxGPA}
                OR s.gpa between :#{#request.minGPA} and :#{#request.maxGPA})
            AND s.status = 0
            """,nativeQuery = true)
    Page<StudentResponse> getStudents(Pageable pageable, StudentFilterRequest request);

}
