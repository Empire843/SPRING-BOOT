package com.ptit.webserviceelectronicshop.model.request_body.User;

import lombok.Data;

@Data
public class RegisterUserBody {
    private String email;
    private String password;
    private String full_name;

}
