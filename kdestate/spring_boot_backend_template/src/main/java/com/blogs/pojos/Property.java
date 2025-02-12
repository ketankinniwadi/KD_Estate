package com.blogs.pojos;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "property")
@Getter
@Setter

public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id")
    private Long propertyId;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @Lob
    private String description;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", message = "Price must be positive")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyStatus status = PropertyStatus.AVAILABLE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private Set<Inquiry> inquiries = new HashSet<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private Set<Listing> listings;

    @Column(name = "imagepath",nullable = true)
    private String imagepath;  
    
    
 // geolocation 
    @Column(name = "Latitude" , nullable = true)
    private Double Latitude;
    @Column(name = "Longitude" , nullable = true)
    private Double Longitude;
    @Column(name = "Bedroom", nullable = true)
    private Integer bedroom;
    @Column(name = "Bathroom", nullable = true)
    private Integer bathroom;
    
    

   
    public enum PropertyStatus {
        AVAILABLE, SOLD, PENDING
    }
    public void addInquiry(Inquiry inquiry) {
    	inquiries.add(inquiry);
    	inquiry.setProperty(this);
    }
    public void RemoveInquiry(Inquiry inquiry) {
    	inquiries.remove(inquiry);
    	inquiry.setProperty(null);
    }
    
}
