import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import numeral from 'numeral';
import axios from 'axios';
const CardProductGrid = (props) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const product = props.data;

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // const islogin = JSON.parse(localStorage.getItem('user'));

    if (user != null) {
      console.log("user:" + user.full_name);
    }
  }, [user]);

  const handleSubmit = async (productID, userID, event) => {
    event.preventDefault();
    try {
      console.log("productID:" + productID);
      console.log("userId:" + userID);

      const response = await axios.post('http://localhost:8080/api/carts/add-item', {
        "productId": productID,
        "userId": userID,
        "quantity": 1
      });
      if (response.status === 200) {


        let x = response.data.cartId;
        localStorage.setItem('codecart', JSON.stringify(x));
        window.location.href = `/cart/${response.data.cartId}`;

      }
    } catch (error) {
      console.log(error);
    }
  }
  //const product = props.data;
  return (
    <div className="card">
      <img src={product.image} style={{ width: '285px', height: '200px' }} className="card-img-top" alt="..." />

      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link to={`/product/detail/${product.id}`} className="text-decoration-none">
            {product.name}
          </Link>
          {product.quantity == 0 && <span className="badge bg-danger me-2">  Hết Hàng</span>}

        </h6>


        <div className="my-2">
          <span className="fw-bold h5">{numeral(product.price).format('0,0.00')} VNĐ</span>

        </div>
        <div className="btn-group  d-flex" role="group">
          {product.quantity > 0 && user != null ? (
            <>
              <Link
                className="btn btn-sm btn-primary"
                onClick={(event) => handleSubmit(product.id, user.id, event)}
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/account/signin"}
                className="btn btn-sm btn-primary"
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </Link>
            </>
          )};

        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
