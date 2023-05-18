package com.ptit.webserviceelectronicshop.model.request_body.Cart;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ptit.webserviceelectronicshop.model.Cart;
import com.ptit.webserviceelectronicshop.model.Product;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private Cart cart;
    private Product product;
    private int quantity;

}
