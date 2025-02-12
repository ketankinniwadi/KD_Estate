package com.blogs.dto;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InquiryDto {
	@JsonProperty(access = Access.READ_WRITE)
    private Long inquiryId;

	@JsonProperty(access = Access.READ_WRITE)
    private Long customerId;
	@JsonProperty(access = Access.READ_ONLY)
	private String customerEmail;

	@JsonProperty(access = Access.READ_WRITE)
    private Long propertyId;

    @NotBlank
    private String message;
    @JsonProperty(access = Access.READ_WRITE)
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") //added new | can be replaced by @JsonFormat with the same pattern : tested that also
    private LocalDateTime date;
}
