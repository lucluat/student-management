package com.example.be.core.admin.repository;

import com.example.be.core.admin.model.response.PersonalResponse;
import com.example.be.repository.PersonalInformationRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdPersonalInformationRepository extends PersonalInformationRepository {

    @Query(value = """
            SELECT 
                 ROW_NUMBER() OVER (ORDER BY s.id DESC ) as orderNumber,
                 pi.id as Id,
                 pi.full_name as name,
                 pi.birth_date as birthDate,
                 pi.gender as gender,
                 pi.relationship as relationship
            FROM personal_infomation pi
            JOIN student s ON s.id = pi.student_id
            WHERE pi.status = 0
            AND s.id = :studentId
            AND s.status = 0
            """,nativeQuery = true)
    List<PersonalResponse> getPersonalInformation(String studentId);

}
