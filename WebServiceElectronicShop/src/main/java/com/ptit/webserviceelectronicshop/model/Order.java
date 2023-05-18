package com.ptit.webserviceelectronicshop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    //    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<OrderItem> items = new ArrayList<>();
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<OrderItem> orderItems;

    @Column(name = "total_quantity")
    private int total_quantity;

    @Column(name = "total_price")
    private double total_price;

    @Column(name = "status")
    private String status;
    @Column(name = "vnpay_code")
    private String vnpayCode;
    @Column(name = "payment_at")
    private String payment_at;
}
