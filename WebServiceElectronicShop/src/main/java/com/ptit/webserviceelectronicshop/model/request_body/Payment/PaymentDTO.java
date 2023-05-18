package com.ptit.webserviceelectronicshop.model.request_body.Payment;

import lombok.Data;

@Data
public class PaymentDTO {
    private  String code;
    private long total;
    private String bankCode1;
    private String ipAddress;
    private String url;

}