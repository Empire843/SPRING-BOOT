import React, { useState, useEffect } from 'react';
import './PaymentSuccess.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import numeral from 'numeral';
function PaymentSuccess() {
    const user = JSON.parse(localStorage.getItem('user'));
    // const user = {
    //     id: 1
    // }
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [orderstatus, setoderstatus] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);

    // Trích xuất thông tin thanh toán từ các tham số
    const vnp_Amount = urlParams.get('vnp_Amount');
    const vnp_BankCode = urlParams.get('vnp_BankCode');
    const vnp_BankTranNo = urlParams.get('vnp_BankTranNo');
    const vnp_CardType = urlParams.get('vnp_CardType');
    const vnp_OrderInfo = urlParams.get('vnp_OrderInfo');
    const vnp_PayDate = urlParams.get('vnp_PayDate');
    const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
    const vnp_TmnCode = urlParams.get('vnp_TmnCode');
    const vnp_TransactionNo = urlParams.get('vnp_TransactionNo');
    const vnp_TransactionStatus = urlParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = urlParams.get('vnp_TxnRef');
    const vnp_SecureHash = urlParams.get('vnp_SecureHash');

    const year = vnp_PayDate.substring(0, 4);
    const month = vnp_PayDate.substring(4, 6);
    const day = vnp_PayDate.substring(6, 8);
    const hour = vnp_PayDate.substring(8, 10);
    const minute = vnp_PayDate.substring(10, 12);
    const second = vnp_PayDate.substring(12, 14);

    const formattedTime = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    console.log(formattedTime);

    useEffect(() => {
        if (vnp_TransactionNo != "0") {
            setIsSuccessful(true);

            console.log("list" + ("13,14,15.21:44:19.7".split('.')[0])); // output: [13, 14, 15]
            console.log("card" + vnp_TxnRef.split('.')[2]); // output: 7
            console.log("user" + user.id);
            console.log("vnpay  " + vnp_TransactionNo);
            console.log(vnp_TxnRef.split('.')[0].split(',').map(Number));
            console.log("tong tien  " + vnp_Amount / 100);

            // const firstTwoValues = vnp_TxnRef.split(',')[0] + ',' + vnp_TxnRef.split(',')[1]; // Lấy 2 giá trị đầu tiên
            const result = vnp_TxnRef.split('.')[0].split(',').map(Number); // Convert các giá trị sang number
            console.log("result:"+result);
            // for (let i = 0; i < result.length; i++) {
            //     console.log(result[i]);
            // }

            // console.log(result); // [2, 1]

            axios.post('http://localhost:8080/api/orders/order', {
                "userId": user.id,
                "cartId": vnp_TxnRef.split('.')[2],
                "total_price": vnp_Amount / 100,
                "vnpayCode": vnp_TransactionNo,
                "productIds": result

            }).then(response => {
                // Xử lý kết quả trả về từ API
                console.log(response.status);
                console.log(response.data.error)
                if (response.status === 200) {
                    // axios.delete('https://example.com/api/orders', {
                    //     "productIds": result,
                    //     "cartId": vnp_TxnRef.split('.')[2]
                    // }).then(response => {
                    //     // Xử lý kết quả trả về từ API
                    //     console.log("xóa thành công");
                    // })
                    //     .catch(error => {
                    //         console.error(error);
                    //     });
                }
            })
                .catch(error => {
                    console.error(error);
                });


            // axios.delete('https://example.com/api/orders', {
            //     "idCartItemArray": vnp_TxnRef.split('.')[0],
            //     "idcart": vnp_TxnRef.split('.')[0]
            // }).then(response => {
            //     // Xử lý kết quả trả về từ API
            //     console.log("xóa thành công");
            // })
            //     .catch(error => {
            //         console.error(error);
            //     });

        }


    }, [vnp_TransactionNo]);
    return (
        <div className="container">
            {isSuccessful ? (
                <div >
                    <div className="payment-success">
                        Thanh toán thành công
                    </div>

                    <div className="payment-info">
                        <h1>Thông tin thanh toán:</h1>
                        {/* <div className="payment-row">
                            <div className="payment-label">Khách Hàng: {user.full_name}</div>
                        </div> */}
                        <div className="payment-row">
                            <div className="payment-label">Số tiền: {numeral(vnp_Amount).format('0,0.00')} VNĐ</div>
                        </div>
                        <div className="payment-row">
                            <div className="payment-label">Thời gian thanh toán:{formattedTime}</div>
                        </div>

                    </div>
                </div>
            ) :
                (
                    <div>
                        <div className="payment-Fail">
                            Thanh toán không thành công
                        </div>
                    </div>
                )};
        </div>
    );
}

export default PaymentSuccess;