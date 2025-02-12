package com.blogs.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogs.Exception.CustomException;
import com.blogs.dao.InquiryDao;
import com.blogs.dao.PropertyRepository;
import com.blogs.dao.UserRepository;
import com.blogs.dto.InquiryDto;
import com.blogs.pojos.Inquiry;
import com.blogs.pojos.Property;
import com.blogs.pojos.User;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class InquiryServiceImpl implements InquiryService {
	@Autowired
	InquiryDao dao;
	@Autowired
	ModelMapper mapper;
	@Autowired
	UserRepository userRepo;
	@Autowired
	PropertyRepository propertyRepo;
	@Override
	public String AddInquiry(InquiryDto inquiry) {
		System.out.println("Received userId: " + inquiry.getCustomerId());
    	User customer = userRepo.findById(inquiry.getCustomerId()).orElseThrow(()->
    	new CustomException("Resource Not Found"));
    	System.out.println("Received PropertyId: " + inquiry.getPropertyId());
    	Property property = propertyRepo.findById(inquiry.getPropertyId()).orElseThrow(()->
    	new CustomException("Resource Not Found"));
    	inquiry.setCustomerEmail(customer.getEmail());
    	Inquiry Entityinquiry = mapper.map(inquiry, Inquiry.class);
    	System.out.println(Entityinquiry.getInquiryId());
        customer.addInquiry(Entityinquiry);
        property.addInquiry(Entityinquiry);
    	dao.save(Entityinquiry);
        return "Inquiry created successfully with ID: " + Entityinquiry.getInquiryId();
	}

}
