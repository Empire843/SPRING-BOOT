package com.ptit.webserviceelectronicshop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payments")
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "amount")
    private double amount;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "status")
    private String status;


}
