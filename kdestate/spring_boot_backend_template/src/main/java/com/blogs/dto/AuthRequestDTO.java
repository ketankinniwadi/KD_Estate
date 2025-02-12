package com.blogs.dto;

import com.blogs.pojos.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequestDTO {
    private String email;
    private String password;
    private String name;
    private UserRole role;
}
