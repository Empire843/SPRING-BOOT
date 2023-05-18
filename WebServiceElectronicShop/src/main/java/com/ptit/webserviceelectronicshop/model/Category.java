package com.ptit.webserviceelectronicshop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String code;

    public Category() {

    }

    public Category(String name, String code) {
        this.name = name;
        this.code = code;
    }

}
