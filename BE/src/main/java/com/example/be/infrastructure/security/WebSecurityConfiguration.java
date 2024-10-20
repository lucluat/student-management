package com.example.be.infrastructure.security;

import com.example.be.infrastructure.constant.Role;
import com.example.be.utils.CorsConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfiguration {

    private final JwtTokenProvider jwtTokenProvider;

    @Value("${allowed.origin}")
    public String ALLOWED_ORIGIN;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        List<String> AL = new ArrayList<>();
        if (ALLOWED_ORIGIN.contains(",")) {
            String[] origins = ALLOWED_ORIGIN.split(",");
            Collections.addAll(AL, origins);
        } else {
            AL.add(ALLOWED_ORIGIN);
        }

        // Tạo CORS cấu hình
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(AL);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("Cache-Control", "Content-Type", "Authorization")); // Sửa lại phần headers
        config.setAllowCredentials(true);

        // Áp dụng cấu hình cho tất cả các route
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);  // Không dùng applyPermitDefaultValues()

        return source;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        JwtTokenFilter jwtTokenFilter = new JwtTokenFilter(jwtTokenProvider);
        http.cors(httpSecurityCorsConfigurer -> {
            httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
        });
        http
               .csrf().disable()
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .requestMatchers("/api/v1/admin/**").hasAuthority(String.valueOf(Role.ADMIN))
                .anyRequest().permitAll();
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
