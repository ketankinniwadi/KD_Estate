package com.blogs.controller;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blogs.dao.ForgotPasswordDao;
import com.blogs.dao.UserRepository;
import com.blogs.dto.EmailRequest;
import com.blogs.dto.MailRequestDto;
import com.blogs.pojos.ForgotPassword;
import com.blogs.pojos.User;
import com.blogs.service.EmailService;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/forgotpassword")
@CrossOrigin(origins = "*") 
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordDao forgotPasswordService;

    @Autowired
    private UserRepository userService;
    @Autowired
    private EmailService emailservice;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/request")
    public ResponseEntity<String> requestOtp(@Valid@RequestBody EmailRequest request) {
    	System.out.println(request.getEmail());
    	
    	Optional<User> userOptional = userService.findByEmail(request.getEmail());
    	if (userOptional.isEmpty()) {
    	    return ResponseEntity.badRequest().body("User not found.");
    	}

    	// Extract the actual User object
    	User user = userOptional.get();

        // Generate OTP and set expiration time (e.g., 5 minutes from now)
        int otp = new Random().nextInt(900000) + 100000; // 6-digit OTP
        Date expirationTime = new Date(System.currentTimeMillis() + (5 * 60 * 1000));
        MailRequestDto mail = MailRequestDto.builder().to(request.getEmail()).message("This is you OTP "+otp).subject("Otp for forgot Password").build();
        ForgotPassword fp = ForgotPassword.builder().otp(otp).expirationTime(expirationTime).user(user).build();
        emailservice.sendEmail(mail);
        forgotPasswordService.save(fp);
        return ResponseEntity.ok("email send for verifycation");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@Valid@RequestBody EmailRequest request) {
    	Optional<User> userOptional = userService.findByEmail(request.getEmail());
    	if (userOptional.isEmpty()) {
    	    return ResponseEntity.badRequest().body("User not found.");
    	}

    	// Extract the actual User object
    	User user = userOptional.get();

        	ForgotPassword fp = forgotPasswordService.findByOtpAndUser(request.getOtp(), user)
        			.orElseThrow(() -> new RuntimeException("Invalid OTP for email: " + request.getEmail()));
        	if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
        	    forgotPasswordService.deleteById(fp.getFpid());
        	    return new ResponseEntity<String>("OTP expired!", HttpStatus.EXPECTATION_FAILED);

        	}
        	String password = request.getPassword();
            user.setPassword(passwordEncoder.encode(password));
            userService.save(user);
            forgotPasswordService.deleteById(fp.getFpid());
        	return ResponseEntity.ok("OTP verified! and password change");
    }

    


}
