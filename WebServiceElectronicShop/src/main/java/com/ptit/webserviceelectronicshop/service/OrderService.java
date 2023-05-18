package com.ptit.webserviceelectronicshop.service;

import com.ptit.webserviceelectronicshop.model.Order;

import java.util.Optional;

public interface OrderService {
    Order addOrder(Order order);

    Optional<Order> getOrder(Long orderId);

    boolean checkOrderByVnpayCode(String vnpayCode);

    void saveOrder(Order order);

    void updateOrder(Order order);

    void deleteOrder(Long id);
}
