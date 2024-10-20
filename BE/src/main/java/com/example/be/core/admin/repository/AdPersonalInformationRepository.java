package com.example.be.core.admin.repository;

import com.example.be.entity.PersonalInformation;
import com.example.be.repository.PersonalInformationRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdPersonalInformationRepository extends PersonalInformationRepository {

    @Query("""
            SELECT pi
            FROM PersonalInformation pi
            WHERE pi.status = 0
            """)
    List<PersonalInformation> getPersonalInformation();

}
