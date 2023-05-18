package com.ptit.webserviceelectronicshop.service;

import com.ptit.webserviceelectronicshop.model.Cart;
import com.ptit.webserviceelectronicshop.model.CartItem;
import com.ptit.webserviceelectronicshop.model.Product;
import jakarta.transaction.Transactional;

import java.util.List;

public interface CartService {

    @Transactional
    void saveCartWithItems(Cart cart);

    void addtoCart(Cart cart);

    Cart getCartById(Long id);

    void saveCart(Cart cart);

    Cart getCartByUserId(Long id);

    void updateCartAfterCheckout(Long cartId, List<Long> productIds);
}
