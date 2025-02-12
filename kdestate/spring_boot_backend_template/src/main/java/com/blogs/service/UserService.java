package com.blogs.service;

import java.util.List;

import com.blogs.dto.UserDto;
import com.blogs.pojos.User;

public interface UserService {


	
	    UserDto getUserById(Long id);
	    List<UserDto> getAllUsers();
	    User createUser(User user);
	    User updateUser(Long id, User user);
	    void deleteUser(Long id);
	}


