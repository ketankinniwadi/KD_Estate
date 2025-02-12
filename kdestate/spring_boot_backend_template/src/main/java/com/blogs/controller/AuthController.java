package com.blogs.controller;

import com.blogs.dao.UserRepository;
import com.blogs.dto.AuthRequestDTO;
import com.blogs.dto.AuthResponseDTO;
import com.blogs.pojos.User;
import com.blogs.pojos.UserRole;
import com.blogs.security.JwtUtil;
import com.blogs.security.CustomUserDetails;
import com.blogs.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Register API
    @PostMapping("/register")
    public String registerUser(@RequestBody AuthRequestDTO authRequest) {
        if (userRepository.findByEmail(authRequest.getEmail()).isPresent()) {
            return "Email is already taken!";
        }

        // ✅ Check if role is provided, otherwise set USER by default
        UserRole role = authRequest.getRole() != null ? authRequest.getRole() : UserRole.USER;

        User newUser = new User();
        newUser.setEmail(authRequest.getEmail());
        newUser.setName(authRequest.getName());
        newUser.setPassword(passwordEncoder.encode(authRequest.getPassword())); // Hash password
        newUser.setRole(role); // ✅ Set dynamic role

        userRepository.save(newUser);
        return "User registered successfully as " + role.name() + "!";
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody AuthRequestDTO authRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(authRequest.getEmail());
        String jwt = jwtUtil.generateToken(userDetails);
        Long userId = jwtUtil.extractUserId(jwt);  // ✅ Extract userId from JWT

        return new AuthResponseDTO(jwt, userDetails.getUser().getRole(), userId);
    }

}