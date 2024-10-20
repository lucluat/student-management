package com.example.be.entity;

import com.example.be.entity.base.PrimaryEntity;
import com.example.be.infrastructure.constant.EntityProperties;
import com.example.be.infrastructure.constant.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@Builder
public class Users extends PrimaryEntity {

    @NotBlank(message = "Tài khoản không được trống!")
    @Column(name = "username", length = EntityProperties.LENGTH_NAME)
    private String username;

    @NotBlank(message = "Mật khẩu không được trống!")
    @Column(name = "password", length = EntityProperties.LENGTH_NAME)
    private String password;

    @Column(name = "role")
    private Role role;

}
