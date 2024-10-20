package com.example.be.infrastructure.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DBGenerator {

    @PostConstruct
    public void init() {
        
    }

}
