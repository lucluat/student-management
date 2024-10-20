package com.example.be.core.authentication.service;

import com.example.be.core.common.base.ResponseObject;
import com.example.be.core.authentication.repository.GUserRepository;
import com.example.be.entity.Users;
import com.example.be.infrastructure.constant.Role;
import com.example.be.infrastructure.security.JwtTokenProvider;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Validated
public class UserService {

    private final HttpSession httpSession;

    private final JwtTokenProvider jwtTokenProvider;

    private final GUserRepository userRepository;

    public ResponseObject<?> createUser(@Valid Users user) {
        Optional<Users> u = userRepository.findByUsername(user.getUsername());
        if (u.isPresent()) {
            return new ResponseObject<>(null, HttpStatus.BAD_REQUEST, "User đã tồn tại!");
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ADMIN);
        Users save = userRepository.save(user);
        return new ResponseObject<>(save, HttpStatus.OK, "Đăng ký thành công");
    }

    public ResponseObject<?> login(@Valid Users user) {
        Optional<Users> u = userRepository.findByUsername(user.getUsername());
        if (u.isEmpty()) {
            return new ResponseObject<>(null, HttpStatus.BAD_REQUEST, "User không tồn tại!");
        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if (!passwordEncoder.matches(user.getPassword(), u.get().getPassword())) {
            return new ResponseObject<>(null, HttpStatus.BAD_REQUEST, "Tài khoản hoặc mật khẩu không đúng!");
        }
        return new ResponseObject<>(jwtTokenProvider.generateToken(u.get()), HttpStatus.OK, "Nhập thành thành công");
    }

}
