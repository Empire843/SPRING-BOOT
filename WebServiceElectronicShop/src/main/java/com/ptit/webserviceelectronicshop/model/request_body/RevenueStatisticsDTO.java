package com.ptit.webserviceelectronicshop.model.request_body;

import lombok.Data;

@Data
public class RevenueStatisticsDTO {
    private long productId;
    private String productName;
    private String productImage;
    private String categoryName;
    private long totalQuantity;
    private double totalPrice;
}
