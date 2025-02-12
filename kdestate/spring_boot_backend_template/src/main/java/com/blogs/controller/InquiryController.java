package com.blogs.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogs.dto.InquiryDto;
import com.blogs.service.InquiryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@RequestMapping("/api/inquiry")

public class InquiryController {
	@Autowired
	InquiryService service;
	@PostMapping("")
	public ResponseEntity<String> postMethodName(@Valid @RequestBody InquiryDto dto) {
		System.out.println("Received Inquiry DTO: " + dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.AddInquiry(dto));
	}
	

}
