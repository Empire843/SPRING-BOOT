package com.ptit.webserviceelectronicshop.service;

import com.ptit.webserviceelectronicshop.model.User;

import java.util.List;

public interface UserService {
    User registerUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    void updateUser(User user);

    boolean deleteUser(Long id);

    User login(String email);

    boolean checkUserByEmail(String email);

}
