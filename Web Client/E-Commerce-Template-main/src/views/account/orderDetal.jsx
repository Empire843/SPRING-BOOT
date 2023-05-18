import React, { Component, lazy, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import numeral from 'numeral';
import { Button } from "bootstrap";
const CouponApplyForm = lazy(() =>
    import("../../components/others/CouponApplyForm")
);

const OrderDetalView = (props) => {


    const { id } = useParams();
    const [OrderItem, setOrderItem] = useState([]);

    useEffect(() => {
        console.log("cartid" + id)
        fetch(`http://localhost:8080/api/orders/${id}/order-items`)
            .then(res => res.json())
            .then(data => setOrderItem(data))
            .catch(error => console.log(error));
    }, [id]);





    return (
        <React.Fragment>
            <div className="bg-secondary border-top p-4 text-white mb-3">
                <h1 className="display-6">Shopping Cart</h1>
            </div>
            <div className="container mb-3">
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead className="text-muted">
                                        <tr className="small text-uppercase">
                                            <th scope="col">Product</th>
                                            <th scope="col" width={120}>
                                                Quantity
                                            </th>
                                            <th scope="col" width={150}>
                                                Unit Price
                                            </th>
                                            <th scope="col" width={150}>
                                                Price
                                            </th>
                                            <th scope="col" className="text-end" width={130}></th>
                                        </tr>
                                    </thead>
                                    {OrderItem.map((order) => (
                                        <tbody>
                                            <tr>

                                                <td>
                                                    <div className="price">

                                                        <Link
                                                            to={`/product/detail/${order.product.id}`}
                                                            className="text-decoration-none"
                                                        >
                                                            {order.product.name}
                                                        </Link>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-3 d-none d-md-block">
                                                            <img
                                                                src={order.product.image}
                                                                width="80"
                                                                alt="..."
                                                            />
                                                        </div>

                                                    </div>
                                                </td>
                                                <td>
                                                    <var className="price">{order.quantity}</var>
                                                </td>
                                                <td>

                                                    <var className="price">{numeral(order.product.price * order.quantity).format('0,0.00')}</var>
                                                </td>
                                                <td>

                                                    <var className="price">{numeral(order.product.price * order.quantity).format('0,0.00')}</var>
                                                </td>


                                            </tr>

                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            <div className="card-footer">

                                <Link to="/category" className="btn btn-secondary">
                                    <IconChevronLeft className="i-va" /> Continue shopping
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </React.Fragment >
    );
}


export default OrderDetalView;