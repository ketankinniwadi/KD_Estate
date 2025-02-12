package com.blogs.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.blogs.pojos.Property;
import com.blogs.pojos.User;

public interface PropertyRepository extends JpaRepository<Property, Long>{
	@Query("select u.properties from User u where u.id =:id")
	@Modifying
	List<Property> getAllPropertybyOwnerid();

}
