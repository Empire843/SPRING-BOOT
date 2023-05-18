package com.ptit.webserviceelectronicshop.model.request_body.Cart;

import lombok.Data;

@Data
public class CartBody {

    private Long productId;
    private Long userId;
    private int quantity;

    // constructors, getters, setters
}
