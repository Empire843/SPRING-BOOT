package com.ptit.webserviceelectronicshop.repository;

import com.ptit.webserviceelectronicshop.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findCartById(Long id);

    Cart findByUserId(Long id);
}
