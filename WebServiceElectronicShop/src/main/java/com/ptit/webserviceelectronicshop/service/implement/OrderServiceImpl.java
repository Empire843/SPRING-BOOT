package com.ptit.webserviceelectronicshop.service.implement;

import com.ptit.webserviceelectronicshop.model.Order;
import com.ptit.webserviceelectronicshop.repository.OrderRepository;
import com.ptit.webserviceelectronicshop.service.OrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Override
    public Order addOrder(Order order) {
        //Optional<Order> savedOrder = Optional.of(this.orderRepository.save(order));
        return this.orderRepository.save(order);
    }

    @Override
    public Optional<Order> getOrder(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }

    @Override
    public boolean checkOrderByVnpayCode(String vnpayCode) {
        Optional<Order> optionalOrder = orderRepository.findByVnpayCode(vnpayCode);
        return optionalOrder.isPresent();
    }

    @Override
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public void updateOrder(Order order) {
        Order existingOrder = orderRepository.findById(order.getId())
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        existingOrder.setStatus(order.getStatus());
        existingOrder.setTotal_price(order.getTotal_price());
        existingOrder.setTotal_quantity(order.getTotal_quantity());
        existingOrder.setVnpayCode(order.getVnpayCode());
        existingOrder.setUser(order.getUser());
        orderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
