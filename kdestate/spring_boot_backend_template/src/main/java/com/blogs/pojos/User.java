package com.blogs.pojos;



import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "users")
@Getter
@Setter

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
    
    @Enumerated(EnumType.STRING) // Store enum as string
    @Column(nullable = false)
    private UserRole role = UserRole.USER; // Default value set to USER
 

    @JsonBackReference
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL,orphanRemoval = true)
	private Set<Property> properties =new HashSet<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private Set<Inquiry> inquiries = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Payment> payments;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Set<Listing> listings;
    @OneToOne(mappedBy = "user")
    private ForgotPassword forgotpassword;
    
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "tier_id")
////    private Tier tier;
   public void addPropety(Property property) {
	   properties.add(property);
	   property.setOwner(this);	
    }
    public void RemoveProperty(Property property) {
    	properties.remove(property);
    	property.setOwner(null);
    }
    public void addInquiry(Inquiry inquiry) {
    	inquiries.add(inquiry);
    	inquiry.setCustomer(this);
    }
    public void RemoveInquiry(Inquiry inquiry) {
    	inquiries.remove(inquiry);
    	inquiry.setCustomer(null);
    }
    public Long getuserId() {
    	return userId;
    }
    
}

