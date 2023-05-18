package com.ptit.webserviceelectronicshop.service.implement;

import com.ptit.webserviceelectronicshop.model.User;
import com.ptit.webserviceelectronicshop.repository.UserRepository;
import com.ptit.webserviceelectronicshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
//@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class UserServiceImpl implements UserService {
//    private final UserRepository repository;
//
//    public UserServiceImpl(UserRepository repository) {
//        this.repository = repository;
//    }

    @Autowired
    UserRepository repository;

    @Override
    public User registerUser(User user) {
        if (repository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        return repository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void updateUser(User user) {
        repository.save(user);
    }

    @Override
    public boolean deleteUser(Long id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public User login(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public boolean checkUserByEmail(String email) {
        User user = repository.findByEmail(email);
        if (user == null) {
            return true;
        } else {
            return false;
        }
//        return repository.findByEmail(email) != null;
    }
}