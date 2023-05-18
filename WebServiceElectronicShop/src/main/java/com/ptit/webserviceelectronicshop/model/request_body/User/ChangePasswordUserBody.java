package com.ptit.webserviceelectronicshop.model.request_body.User;

import lombok.Data;

@Data
public class ChangePasswordUserBody {
    private String oldPassword;
    private String newPassword;
}
