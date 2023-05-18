package com.ptit.webserviceelectronicshop.model.request_body.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UpdateUserBody {
    private String full_name;
    private String phone;
    private String address;
    private String avatar;
}
