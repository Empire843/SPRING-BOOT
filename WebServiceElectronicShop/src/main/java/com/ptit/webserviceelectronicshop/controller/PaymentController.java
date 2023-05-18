package com.ptit.webserviceelectronicshop.controller;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;


@RestController
@CrossOrigin
@Controller
@RequestMapping("/api/payments")
public class PaymentController {
//    @GetMapping("/return")
//    private String abc(
//            @RequestParam(name = "vnp_Amount") String vnp_Amount,
//            Model model
//    ){
//
//       return vnp_Amount;
//    }

    @GetMapping("/create")
    public String vnPayPayment(
            @RequestParam(name = "code") String code,
            @RequestParam(name = "total") long total,
            @RequestParam(name = "bankCode1") String bankCode1,
            @RequestParam(name = "ipAddress") String ipAddress

    ) throws UnsupportedEncodingException {
        String vnp_TxnRef =code;// id don hang cua minh
        long amount =(long) total;
        String orderType = "other";
        String bankCode = bankCode1;
        String vnp_IpAddr = ipAddress;
        String vnp_TmnCode = "0QM0JG0X";//
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        // ====================== tehm du lieu de goi api vnpay
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount * 100));
        vnp_Params.put("vnp_CurrCode", "VND");

        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        // ngon ngu
        // String locate = null;
        // if (locate != null && !locate.isEmpty()) {
        //     vnp_Params.put("vnp_Locale", locate);
        // } else {
        //     vnp_Params.put("vnp_Locale", "vn");
        // }
        vnp_Params.put("vnp_Locale", "vn");
        //http://localhost:8080/api/payments/return
        vnp_Params.put("vnp_ReturnUrl","http://localhost:3000/message");
        vnp_Params.put("vnp_IpAddr", ipAddress);
        // try {
        //     vnp_Params.put("vnp_Bill_Mobile", objReq.getString("vnp_Bill_Mobile"));// vd: 84932224546
        // } catch (Exception e) {
        // }

        vnp_Params.put("vnp_Inv_Company", "Cửa hàng Electronic");

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                // Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                // Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = hmacSHA512("OHSFYRAZYRRSIWLVRRXRLEVDTVLEVZFC", hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl ="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html" + "?" + queryUrl;
        return paymentUrl;

    }

    public static String md5(String message) {
        String digest = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(message.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder(2 * hash.length);
            for (byte b : hash) {
                sb.append(String.format("%02x", b & 0xff));
            }
            digest = sb.toString();
        } catch (UnsupportedEncodingException ex) {
            digest = "";
        } catch (NoSuchAlgorithmException ex) {
            digest = "";
        }
        return digest;
    }

    public static String Sha256(String message) {
        String digest = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(message.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder(2 * hash.length);
            for (byte b : hash) {
                sb.append(String.format("%02x", b & 0xff));
            }
            digest = sb.toString();
        } catch (UnsupportedEncodingException ex) {
            digest = "";
        } catch (NoSuchAlgorithmException ex) {
            digest = "";
        }
        return digest;
    }
    // Util for VNPAY
    public static String hashAllFields(Map fields) {
        List fieldNames = new ArrayList(fields.keySet());
        Collections.sort(fieldNames);
        StringBuilder sb = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) fields.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                sb.append(fieldName);
                sb.append("=");
                sb.append(fieldValue);
            }
            if (itr.hasNext()) {
                sb.append("&");
            }
        }
        return hmacSHA512("OHSFYRAZYRRSIWLVRRXRLEVDTVLEVZFC", sb.toString());
    }

    public static String hmacSHA512(final String key, final String data) {
        try {
            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }


}
