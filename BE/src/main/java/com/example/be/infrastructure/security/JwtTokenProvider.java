package com.example.be.infrastructure.security;

import com.example.be.entity.Users;
import com.example.be.infrastructure.constant.Role;
import com.example.be.utils.AuthorizeUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class JwtTokenProvider {

    @Autowired
    private HttpSession httpSession;

    public Authentication getAuthentication(String token) {
        SecretKey secretKey = AuthorizeUtil.generateJwtSecretKey();
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        String username = claims.get("username", String.class);
        String password = claims.get("password", String.class);
        String role = claims.get("role", String.class);

        httpSession.setAttribute("username", username);
        httpSession.setAttribute("password", password);
        httpSession.setAttribute("role", role);
        List<String> roles = new ArrayList<>();
        if (role!=null){
            roles.add(role);
        }
        CopyOnWriteArrayList<SimpleGrantedAuthority> authorityList = new CopyOnWriteArrayList<>();

        System.out.println("SessionConstant.usernme: " + httpSession.getAttribute("username"));
        System.out.println("SessionConstant.password: " + httpSession.getAttribute("password"));
        System.out.println("SessionConstant.role: " + httpSession.getAttribute("role"));
        roles.stream().forEach(el -> {
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(el);
            authorityList.add(authority);
        });
        httpSession.setAttribute("role", authorityList);
        return new UsernamePasswordAuthenticationToken(null, token, authorityList);
    }

    public static String generateToken(Users user) {
        // Thời gian hiện tại
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Thời gian hết hạn của token (1 năm)
        long expirationMillis = nowMillis + (365 * 24 * 60 * 60 * 1000);
        Date expiration = new Date(expirationMillis);

        // Thông tin payload của token
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("password", user.getPassword());
        claims.put("role", String.valueOf(user.getRole()));

        // Tạo token
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(AuthorizeUtil.generateJwtSecretKey())
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            SecretKey secretKey = AuthorizeUtil.generateJwtSecretKey();
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

            Date expirationDate = claims.getBody().getExpiration();
            if (expirationDate.before(new Date())) {
                return false;
            }

            return true;
        } catch (JwtException | IllegalArgumentException e) {
            e.printStackTrace();
            return false;
        }
    }

}
