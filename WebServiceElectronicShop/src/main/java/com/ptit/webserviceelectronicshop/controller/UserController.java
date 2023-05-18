package com.ptit.webserviceelectronicshop.controller;

import com.ptit.webserviceelectronicshop.model.Cart;
import com.ptit.webserviceelectronicshop.model.User;
import com.ptit.webserviceelectronicshop.model.request_body.User.ChangePasswordUserBody;
import com.ptit.webserviceelectronicshop.model.request_body.User.LoginUserBody;
import com.ptit.webserviceelectronicshop.model.request_body.User.RegisterUserBody;
import com.ptit.webserviceelectronicshop.model.request_body.User.UpdateUserBody;
import com.ptit.webserviceelectronicshop.service.implement.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserBody userDTO) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();

        String email = userDTO.getEmail();
        String password = userDTO.getPassword();
        try {
            User loggedUser = userService.login(email);
            if (loggedUser == null) {
                error.put("message", "Email is incorrect");
                return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
            } else {
                if (!loggedUser.getPassword().equals(password)) {
                    error.put("message", "Password is incorrect");
                    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
                }

            }
            response.put("message", "User logged in successfully");
            response.put("user", loggedUser);

        } catch (RuntimeException e) {
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserBody body) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
//        ModelMapper mapper = new ModelMapper();
//        User user = mapper.map(body, User.class)
        if (!userService.checkUserByEmail(body.getEmail())) {
            error.put("message", "Email is already in use");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setEmail(body.getEmail());
        user.setPassword(body.getPassword());
        user.setFull_name(body.getFull_name());
        user.setRole("USER");
        try {
            User createdUser = userService.registerUser(user);
            response.put("message", "User registered successfully");
            response.put("user", createdUser);
        } catch (RuntimeException e) {
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long userId) {
        if (userService.getUserById(userId) == null) return new ResponseEntity<>("User not found", HttpStatus.OK);
        return new ResponseEntity<>(userService.getUserById(userId), HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}/edit-profile")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long userId, @RequestBody UpdateUserBody body) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
        if (userService.getUserById(userId) == null) {
            error.put("message", "User not found");
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        } else {
            User user = userService.getUserById(userId);
            user.setAddress(body.getAddress());
            user.setPhone(body.getPhone());
            user.setFull_name(body.getFull_name());
            user.setAvatar(body.getAvatar());

            userService.updateUser(user);
            response.put("message", "User updated successfully");
            response.put("user", user);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable("id") Long userId, @RequestBody ChangePasswordUserBody body) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
        User user = new User();
        user = userService.getUserById(userId);
        if (user == null) {
            error.put("message", "User not found");
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        } else {
            if (!user.getPassword().equals(body.getOldPassword())) {
                error.put("message", "Password does not match!");
                return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
            } else {
                user.setPassword(body.getNewPassword());
                userService.updateUser(user);
                response.put("message", "Change password successfully");
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long userId) {
        if (userService.deleteUser(userId)) return new ResponseEntity<>("User not found", HttpStatus.OK);
        return new ResponseEntity<>(userService.deleteUser(userId), HttpStatus.OK);
    }
}

