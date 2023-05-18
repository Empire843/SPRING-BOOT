package com.ptit.webserviceelectronicshop.service.implement;

import com.ptit.webserviceelectronicshop.model.Cart;
import com.ptit.webserviceelectronicshop.model.CartItem;
import com.ptit.webserviceelectronicshop.repository.CartItemRepository;
import com.ptit.webserviceelectronicshop.repository.CartRepository;
import com.ptit.webserviceelectronicshop.repository.ProductRepository;
import com.ptit.webserviceelectronicshop.service.CartService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository repository;
    @Autowired
    private CartItemRepository cartItemRepository;

    @Transactional
    @Override
    public void saveCartWithItems(Cart cart) {
        repository.save(cart);
    }

    @Override
    public void addtoCart(Cart cart) {
        repository.save(cart);
    }

    @Override
    public Cart getCartById(Long id) {
        return repository.findCartById(id);
    }

    @Override
    public void saveCart(Cart cart) {
        repository.save(cart);
    }

    @Override
    public Cart getCartByUserId(Long id) {
        return repository.findByUserId(id);
    }

    @Override
    public void updateCartAfterCheckout(Long cartId, List<Long> productIds) {
        // Tìm kiếm giỏ hàng với id được chỉ định
        List<CartItem> list = cartItemRepository.findByCartId(cartId);
        if (list.size() == 0) {
            return;
        }
        for (CartItem item : list) {
            // Nếu sản phẩm có trong giỏ hàng thì xóa đi sản phẩm đó và giảm total_amount trong cart
            if (productIds.contains(item.getProduct().getId())) {
                cartItemRepository.delete(item);
                Cart cart = repository.findCartById(cartId);
                cart.setTotalAmount((long) (cart.getTotalAmount() - item.getProduct().getPrice() * item.getQuantity()));
                repository.save(cart);
                cartItemRepository.delete(item);
            }

        }
    }
}
