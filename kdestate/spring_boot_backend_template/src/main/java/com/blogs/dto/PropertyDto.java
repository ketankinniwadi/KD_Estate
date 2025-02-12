package com.blogs.dto;

import java.time.LocalDateTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class PropertyDto {
	@JsonProperty(access = Access.READ_ONLY)
    private Long propertyId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Price is required")
    private Double price;

    @NotBlank(message = "Location is required")
    private String location;

    @JsonProperty(access = Access.READ_WRITE)
    private String imagepath;
    @NotNull(message = "Latitude is required")
    private Double latitude;
    @NotNull(message = "Longitude is required")
    private Double longitude;
    @NotNull(message = "Bedroom is required")
    private Integer bedroom;
    @NotNull(message = "Bathroom is required")
    private Integer bathroom;
    
    @JsonProperty(access = Access.READ_WRITE)
    private Long ownerId; // ID of the user who owns the property
    @JsonProperty(access = Access.READ_ONLY)
    private Set<InquiryDto> inquiries;
}
