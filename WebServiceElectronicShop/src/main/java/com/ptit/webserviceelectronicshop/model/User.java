package com.ptit.webserviceelectronicshop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Table(name = "user")
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String full_name;
    @Column
    @JsonIgnore
    private String password;
    @Column
    private String email;
    @Column
    private String phone;
    @Column
    private String address;
    @Column
    private String role;
    @Column
    private String avatar;

//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnore
//    private Cart cart;
    public User() {

    }
}
