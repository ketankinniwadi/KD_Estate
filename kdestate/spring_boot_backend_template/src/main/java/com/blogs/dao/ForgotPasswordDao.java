package com.blogs.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.blogs.pojos.ForgotPassword;
import com.blogs.pojos.User;

public interface ForgotPasswordDao  extends JpaRepository<ForgotPassword, Integer>{
	@Query("select fp from ForgotPassword fp where fp.otp = ?1 and fp.user = ?2")
	Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);


}
