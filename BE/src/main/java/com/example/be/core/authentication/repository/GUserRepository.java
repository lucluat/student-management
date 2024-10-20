package com.example.be.core.authentication.repository;

import com.example.be.entity.Users;
import com.example.be.repository.UsersRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GUserRepository extends UsersRepository {

    Optional<Users> findByUsername(String username);

}
