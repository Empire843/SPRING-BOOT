package com.ptit.webserviceelectronicshop.controller;

import com.ptit.webserviceelectronicshop.model.*;
import com.ptit.webserviceelectronicshop.model.request_body.Order.OrderDTO;
import com.ptit.webserviceelectronicshop.repository.CartItemRepository;
import com.ptit.webserviceelectronicshop.repository.OrderItemRepository;
import com.ptit.webserviceelectronicshop.service.implement.CartServiceImpl;
import com.ptit.webserviceelectronicshop.service.implement.OrderServiceImpl;
import com.ptit.webserviceelectronicshop.service.implement.ProductServiceImpl;
import com.ptit.webserviceelectronicshop.service.implement.UserServiceImpl;
import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/orders")
public class OrderController {
    //    @Autowired
//    private OrderService orderService;
    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private ProductServiceImpl productService;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private CartServiceImpl cartService;

    @PostMapping("/order")
    public ResponseEntity<Object> createOrder(@NotNull @RequestBody @Valid OrderDTO body) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
        User user = userService.getUserById(body.getUserId());
        if (user == null) {
            error.put("message", "User not found");
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        }
        if (orderService.checkOrderByVnpayCode(body.getVnpayCode())) {
            error.put("message", "Vnpay code is exist");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
        List<OrderItem> list = new ArrayList<>();
        Long cartId = body.getCartId();
        List<CartItem> listCartItem = cartItemRepository.findByCartId(cartId);
        if (listCartItem.size() == 0) {
            error.put("message", "Cart is empty!");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
        int flag = 0;
        Order order = new Order();
        orderService.saveOrder(order);
        for (CartItem item : listCartItem) {
            for (Long idp : body.getProductIds()) {
//                flag++;
                if (idp == item.getProduct().getId()) {
                    flag++;
                    OrderItem orderItem = new OrderItem();
                    orderItem.setProduct(item.getProduct());
                    orderItem.setQuantity(item.getQuantity());
                    orderItem.setOrder(order);
                    productService.updateProductQuantity(item.getProduct().getId(), item.getQuantity());
                    orderItemRepository.save(orderItem);
                    list.add(orderItem);
                }
            }
        }
        if (flag == 0) {
            error.put("message", "Product not found");
            orderService.deleteOrder(order.getId());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

        order.setUser(user);
        order.setTotal_quantity(0);
        order.setTotal_price(0);
        order.setVnpayCode(body.getVnpayCode());
        order.setStatus(body.getStatus());
        order.setTotal_quantity(body.getTotal_quantity());
        order.setTotal_price(body.getTotal_price());

        LocalDateTime localDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy-HH:mm");
        String formattedDateTime = localDateTime.format(formatter);
        order.setPayment_at(formattedDateTime);

        cartService.updateCartAfterCheckout(cartId, body.getProductIds());
        orderService.updateOrder(order);
        response.put("message", "Order created successfully");
        response.put("order", order);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable("id") Long orderId) {
        return orderService.getOrder(orderId).orElse(null);
    }

    @GetMapping("/{id}/order-items")
    public List<OrderItem> getCartItemsByCartId(@PathVariable Long id) {
        return orderItemRepository.findByOrderId(id);
    }

    @GetMapping("/all")
    public List<Order> getAllOrder() {
        List<Order> list = orderService.getAllOrder();
        if (list.size() == 0) return null;
        return orderService.getAllOrder();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable("id") Long orderId, @RequestBody OrderDTO body) {

        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable("id") Long orderId) {
        return null;
    }
}
