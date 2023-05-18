package com.ptit.webserviceelectronicshop.controller;

import com.ptit.webserviceelectronicshop.model.Category;
import com.ptit.webserviceelectronicshop.model.request_body.Category.CategoryDTO;
import com.ptit.webserviceelectronicshop.service.implement.CategoryServiceImpl;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryServiceImpl service;

    @GetMapping("/all")
    public List<Category> getAllCategory() {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
        List<Category> categories = service.getAllCategory();
        if (categories.isEmpty()) {
            error.put("message", "Category not found");
            return null;
        } else {
            return categories;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@NonNull @PathVariable Long id) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
        Category categories = service.getCategoryById(id);
        if (categories == null) {
            error.put("message", "Category not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(categories);
        }
    }

    //    api add new category
    @PostMapping("/add")
    public ResponseEntity<Object> addNewCategory(@RequestBody CategoryDTO body) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
        boolean addNew = service.addNewCategory(new Category(body.getName(), body.getCode()));
        if (!addNew) {
            error.put("message", "Category code already exists");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        } else {
            response.put("message", "Category has been added successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
        Category updatedCategory = service.updateCategory(id, category);
        if (updatedCategory != null) {
            response.put("message", "Category has been updated successfully");
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } else {
            error.put("message", "Category not found");
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCategory(@PathVariable Long id) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
        if (service.deleteCategory(id)) {
            response.put("message", "Category has been deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            error.put("message", "Category not found");
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        }
    }
}
