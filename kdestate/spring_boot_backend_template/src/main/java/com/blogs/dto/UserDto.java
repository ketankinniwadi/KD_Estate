package com.blogs.dto;

import java.util.HashSet;
import java.util.Set;

import com.blogs.pojos.Inquiry;
import com.blogs.pojos.Listing;
import com.blogs.pojos.Payment;
import com.blogs.pojos.Property;
import com.blogs.pojos.UserRole;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class UserDto {
	@JsonProperty(access = Access.READ_ONLY)
    private Long userId;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @JsonProperty(access = Access.WRITE_ONLY)
    private String email;
    @JsonProperty(access = Access.WRITE_ONLY)
    @NotBlank(message = "Password is required")
    private String password;
    
    @Enumerated(EnumType.STRING) // Store enum as string
    private UserRole role = UserRole.USER; // Default value set to USER
 

    @JsonProperty(access = Access.READ_ONLY)
	private Set<PropertyDto> properties ;
    
    @JsonProperty(access = Access.READ_ONLY)
    private Set<InquiryDto> inquiries;

    

    

}
