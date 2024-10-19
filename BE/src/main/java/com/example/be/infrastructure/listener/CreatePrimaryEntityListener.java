package com.example.be.infrastructure.listener;

import com.example.be.entity.base.PrimaryEntity;
import com.example.be.infrastructure.constant.EntityStatus;
import jakarta.persistence.PrePersist;

import java.util.UUID;

public class CreatePrimaryEntityListener {

    @PrePersist
    private void onCreate(PrimaryEntity entity) {
        entity.setId(UUID.randomUUID().toString());
        entity.setStatus(EntityStatus.ACTIVE);
    }

}
