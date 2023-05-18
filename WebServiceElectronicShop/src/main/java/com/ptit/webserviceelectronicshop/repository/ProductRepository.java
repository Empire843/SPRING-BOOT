package com.ptit.webserviceelectronicshop.repository;

import com.ptit.webserviceelectronicshop.model.Category;
import com.ptit.webserviceelectronicshop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);

    @Query("SELECT c FROM Product c WHERE c.name LIKE %:keyword%")
    ArrayList<Product> findByKey(@Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId")
    ArrayList<Product> getProductsByCategory(@Param("categoryId") Long categoryId);

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :start AND :end")
    ArrayList<Product> getProductInSpacePrice(@Param("start") Double start, @Param("end") Double end);
}
