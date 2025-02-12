package com.blogs.dto;

import com.blogs.pojos.UserRole;

public class AuthResponseDTO {
    private String token;
    private String role;
    private Long userId;  // ✅ Add userId

    public AuthResponseDTO(String token, UserRole role, Long userId) {
        this.token = token;
        this.role = role.name();
        this.userId = userId;
    }

    // ✅ Getters & Setters
    public String getToken() { return token; }
    public String getRole() { return role; }
    public Long getUserId() { return userId; }
}