package com.ptit.webserviceelectronicshop.service;

import com.ptit.webserviceelectronicshop.model.Category;

import java.util.List;

public interface CategoryService {
    boolean addNewCategory(Category category);

    Category updateCategory(Long id, Category category);

    boolean deleteCategory(Long id);

    Category getCategoryById(Long id);

    List<Category> getAllCategory();
}
