import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../cart/PaymentSuccess.css';
import numeral from 'numeral';
import {
  faCheckCircle,
  faExclamationTriangle,
  faHistory,
  faTimesCircle,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

const OrdersView = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:8080/api/orders/all');
      setOrders(result.data);
      console.log(result);
    }
    fetchData();
  }, []);

  return (
    <div className="orders" >

      {orders === '' ? (

        <h4 className="my-3">Orders</h4>

      ) : (
        <>
          <h4 className="my-3">Orders </h4>
          {orders.map((order) => (
            <div className="row g-3">
              <div>
                <div >
                  <div>

                    <div >
                      <div >
                        <div >
                          <span className="border bg-secondary rounded-left px-2 text-white">
                            Order ID
                          </span>
                          <span className="border bg-white rounded-right px-2 me-2">
                            #{order.id}
                          </span>
                          <span className="border bg-secondary rounded-left px-2 text-white">
                            Date
                          </span>
                          <span className="border bg-white rounded-right px-2">
                            {order.payment_at}
                          </span>
                          <span className="border bg-secondary rounded-left px-2 text-white">
                            Total price
                          </span>
                          <span className="border bg-white rounded-right px-2">
                            {numeral(order.total_price).format('0,0.00')} VNĐ
                          </span>
                          <Link to={`/orderItem/${order.id}`} className="text-decoration-none">

                            detail
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>




            </div>))}
        </>
      )}
      {/* {orders.map((order) => (
        <div className="row g-3">
          <div>
            <div >
              <div>

                <div >
                  <div >
                    <div >
                      <span className="border bg-secondary rounded-left px-2 text-white">
                        Order ID
                      </span>
                      <span className="border bg-white rounded-right px-2 me-2">
                        #{order.id}
                      </span>
                      <span className="border bg-secondary rounded-left px-2 text-white">
                        Date
                      </span>
                      <span className="border bg-white rounded-right px-2">
                        {order.payment_at}
                      </span>
                      <span className="border bg-secondary rounded-left px-2 text-white">
                        Total price
                      </span>
                      <span className="border bg-white rounded-right px-2">
                        {numeral(order.total_price).format('0,0.00')} VNĐ
                      </span>
                      <Link to="/account/orders/${order.id}" className="border bg-white rounded-right px-2">
                        detail
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>


        
          
          </div>))} */}
    </div>
  );

}

export default OrdersView;
