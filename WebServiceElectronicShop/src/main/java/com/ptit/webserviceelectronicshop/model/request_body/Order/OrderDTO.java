package com.ptit.webserviceelectronicshop.model.request_body.Order;

import com.ptit.webserviceelectronicshop.model.Product;
import com.ptit.webserviceelectronicshop.model.User;
import lombok.Data;

import java.util.List;

@Data
public class OrderDTO {
    private Long userId;
    private Long cartId;
    private int total_quantity;
    private double total_price;
    private String status;
    private String vnpayCode;
    private List<Long> productIds;
}
