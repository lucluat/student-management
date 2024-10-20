package com.example.be.utils;

import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class AuthorizeUtil {

    public static SecretKey generateJwtSecretKey() {
        String originalString = "123456";
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("SHA-512");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-512 algorithm not available. Check your JDK configuration.", e);
        }
        byte[] hashed = md.digest(originalString.getBytes(StandardCharsets.UTF_8));
        return Keys.hmacShaKeyFor(hashed);
    }

}
