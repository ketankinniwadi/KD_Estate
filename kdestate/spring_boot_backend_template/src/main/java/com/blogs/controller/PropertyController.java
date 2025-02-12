package com.blogs.controller;

import com.blogs.dto.PropertyDto;
import com.blogs.pojos.Property;
import com.blogs.pojos.User;
import com.blogs.service.PropertyService;
import com.blogs.service.UserService; // Import UserService

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;
    private final UserService userService;  // Injecting UserService

    @Value("${upload.path}")
    private String uploadDir;

    public PropertyController(PropertyService propertyService, UserService userService) {
        this.propertyService = propertyService;
        this.userService = userService;  // Initializing UserService
    }

    @GetMapping
    public ResponseEntity<List<PropertyDto>> getAllProperties() {
        return ResponseEntity.ok(propertyService.getAllProperties());
    }

    @PostMapping
    public ResponseEntity<String> createProperty(@Valid @RequestBody PropertyDto property) {
        // Fetch the owner (User) from the database before assigning it to the property
    	System.out.println("Received Property DTO: " + property);
        return ResponseEntity.status(HttpStatus.CREATED).body(propertyService.addProperty(property));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.ok("Property deleted successfully");
    }
    @GetMapping("/{id}")
    public ResponseEntity<PropertyDto> getPropertyById(@PathVariable Long id) {
        
    	return ResponseEntity.ok(propertyService.getPropertyById(id));
    }
    
  

    /** 
     * Upload an image for a property and save its path 
     */
   
    /** 
     * Update property geolocation (latitude & longitude) 
     */
    
}
