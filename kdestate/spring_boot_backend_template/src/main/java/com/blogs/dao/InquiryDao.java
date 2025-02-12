package com.blogs.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogs.pojos.Inquiry;

public interface InquiryDao extends JpaRepository<Inquiry, Long>{

}
