package com.ptit.webserviceelectronicshop.service.implement;

import com.ptit.webserviceelectronicshop.model.Category;
import com.ptit.webserviceelectronicshop.repository.CategoryRepository;
import com.ptit.webserviceelectronicshop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository repository;

    @Override
    public boolean addNewCategory(Category category) {
        if (repository.findByCode(category.getCode()) != null) {
            return false;
        } else {
            repository.save(category);
            return true;
        }
    }
    @Override
    public Category updateCategory(Long id, Category category) {
        Category existingCategory = repository.findById(id).orElse(null);
        if (existingCategory != null) {
            existingCategory.setName(category.getName());
            return repository.save(existingCategory);
        } else {
            return null;
        }
    }
    @Override
    public boolean deleteCategory(Long id) {
        if(repository.findById(id).orElse(null) != null) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Category getCategoryById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Category> getAllCategory() {
        return repository.findAll();
    }
}
