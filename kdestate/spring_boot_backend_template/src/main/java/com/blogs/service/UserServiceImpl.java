
package com.blogs.service;

import com.blogs.pojos.User;

import jakarta.transaction.Transactional;

import com.blogs.dao.UserRepository;
import com.blogs.dto.UserDto;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Transactional
@Service
public class UserServiceImpl implements UserService {
	@Autowired
    private UserRepository userRepository;
	@Autowired
	private ModelMapper mapper;

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        UserDto dto = mapper.map(user, UserDto.class);
        return dto;
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> userlist = userRepository.findAll();
        return userlist.stream().map(user -> mapper.map(user, UserDto.class)).collect(Collectors.toList());
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setName(user.getName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setRole(user.getRole());
            return userRepository.save(updatedUser);
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

