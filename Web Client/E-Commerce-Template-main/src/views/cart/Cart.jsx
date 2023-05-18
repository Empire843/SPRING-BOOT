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

const CartView = () => {

  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const [Carts, setCarts] = useState([]);
  const [ipclient, setipclient] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [valueproduct, setValue] = useState(1);



  const handleCheckBoxChange = (event, cartId) => {
    const updatedCarts = Carts.map((cart) => {
      if (cart.id === cartId) {
        cart.isChecked = event.target.checked;
      }
      return cart;
    });
    setCarts(updatedCarts);

    if (ipclient == "") {
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => setipclient(data.ip))
        .catch(error => console.error(error));
    }

  };
  useEffect(() => {
    console.log("cartid" + id)
    fetch(`http://localhost:8080/api/carts/${id}/items`)
      .then(res => res.json())
      .then(data => setCarts(data))
      .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    let total = 0;
    Carts.forEach((cart) => {
      if (cart.isChecked) {
        total += cart.product.price * cart.quantity;
      }
    });
    setTotalPrice(total);
  }, [Carts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const handleMakePurchase = (event) => {
    const checkedCarts = Carts.filter(cart => cart.isChecked);
    const cartIds = checkedCarts.map(cart => cart.product.id);
    const code = cartIds.join(',') + "." + currentTime.toLocaleTimeString() + "." + id;
    console.log("code:" + code);
    axios.get('http://localhost:8080/api/payments/create', {
      params: {
        'code': code,
        'total': totalPrice,
        'bankCode1': '',
        'ipAddress': ipclient
      }
    })
      .then(response => {
        // Xử lý kết quả trả về từ API
        console.log("Link" + response.data);
        window.location.href = response.data;
      })
      .catch(error => {
        console.error(error);
      });

    console.log(ipclient)
    console.log("tổng tiền" + totalPrice);
  }


  const handleDeleteCart = (event, cartId) => {
    axios.delete(`http://localhost:8080/api/carts/${cartId}`)
      .then(response => {
        console.log(response.data);
        // nếu xóa cart thành công, ta cập nhật lại danh sách các carts và tính lại tổng giá tiền
        const updatedCarts = Carts.filter(cart => cart.id !== cartId);
        setCarts(updatedCarts);
        let total = 0;
        updatedCarts.forEach(cart => {
          if (cart.isChecked) {
            total += cart.product.price * cart.quantity;
          }
        });
        setTotalPrice(total);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // const handleMinusClick = (product) => {
  //   if (valueproduct > 1) {
  //     setValue(valueproduct - 1);
  //   }
  // };

  // const handlePlusClick = (product) => {
  //   if (valueproduct < product.quantity) {
  //     setValue(valueproduct + 1);
  //   }
  // };

  // const handleChange = (event, product) => {
  //   const newValue = parseInt(event.target.value, 10);
  //   if (newValue >= 1 && newValue <= product.quantity) {
  //     setValue(newValue);
  //   }
  // };

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
                  {Carts.map((cart) => (
                    <tbody>
                      <tr>

                        <td>
                          <div className="price">

                            <Link
                              to={`/product/detail/${cart.product.id}`}
                              className="text-decoration-none"
                            >
                              {cart.product.name}
                            </Link>

                          </div>
                          <div className="row">
                            <div className="col-3 d-none d-md-block">
                              <img
                                src={cart.product.image}
                                width="80"
                                alt="..."
                              />
                            </div>

                          </div>
                        </td>
                        <td>
                          {/* <div className="input-group input-group-sm mw-140">
                            <button
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={handleMinusClick(cart.product)}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <input
                              type="text"
                              className="form-control"
                              value={valueproduct(cart.product)}
                              onChange={handleChange(cart.product)}
                            />
                            <button
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={handlePlusClick(cart.product)}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div> */}
                          <var className="price">{cart.quantity}</var>
                        </td>
                        <td>

                          <var className="price">{numeral(cart.product.price * cart.quantity).format('0,0.00')}</var>
                        </td>
                        <td>

                          <var className="price">{numeral(cart.product.price * cart.quantity).format('0,0.00')}</var>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-danger"
                            onClick={(event) => handleDeleteCart(event, cart.id)}>

                            <IconTrash className="i-va" />
                          </button>
                        </td>
                        <td className="text-end">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault1"
                            style={{ transform: "scale(1.5)" }}
                            onChange={(event) => handleCheckBoxChange(event, cart.id)}
                            checked={cart.isChecked}>
                          </input>
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
          <div className="col-md-3">

            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Total price:</dt>
                  <dd className="col-6 text-end" >{numeral(totalPrice).format('0,0.00')} VNĐ</dd>
                </dl>
                <hr />
                <Link
                  className="btn btn-secondary"
                  onClick={() => handleMakePurchase()}>
                  Make Purchase
                  <IconChevronRight className="i-va" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  );
}


export default CartView;
