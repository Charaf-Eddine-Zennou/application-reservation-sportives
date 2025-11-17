package com.sportscener.sports_center_backend.service;

import com.sportscener.sports_center_backend.exception.UserAlreadyExistsException;
import com.sportscener.sports_center_backend.model.User;
import com.sportscener.sports_center_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public abstract class UserService {

    @Autowired
    protected UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public abstract User saveUser(User user);

    public abstract User login(String username, String password);

    public abstract User register(User user) throws UserAlreadyExistsException;

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
