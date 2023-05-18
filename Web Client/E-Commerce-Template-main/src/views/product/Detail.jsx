import React, { Component, lazy, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import numeral from 'numeral';
import axios from 'axios';
import {
  faCartPlus,
  faHeart,
  faShoppingCart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../data";
const CardFeaturedProduct = lazy(() =>
  import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
  import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(() =>
  import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);
const SizeChart = lazy(() => import("../../components/others/SizeChart"));

const ProductDetailView = () => {

  const { id } = useParams(); // lấy tham số id từ URL
  const [product, setProduct] = useState(null);
  const [valueproduct, setValue] = useState(1);
  const user = JSON.parse(localStorage.getItem('user'));
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(error => console.log(error));
  }, [id]);

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
      console.log("userId:" + valueproduct);
      const response = await axios.post('http://localhost:8080/api/carts/add-item', {
        "productId": productID,
        "userId": userID,
        "quantity": valueproduct
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


  // nếu product chưa được load, hiển thị thông báo đang loading
  if (!product) {
    return <div>Loading...</div>;
  }



  const handleMinusClick = () => {
    if (valueproduct > 1) {
      setValue(valueproduct - 1);
    }
  };

  const handlePlusClick = () => {
    if (valueproduct < product.quantity) {
      setValue(valueproduct + 1);
    }
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue >= 1 && newValue <= product.quantity) {
      setValue(newValue);
    }
  };



  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">

              <img src={product.image} style={{ width: '350px', height: '200px' }} className="img-fluid mb-3" alt="..." />
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline me-2">
                {product.name}
              </h1>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <div className="mb-3">
                <a>Giá Bán: </a>  <span className="fw-bold h5 me-2">{numeral(product.price).format('0,0.00')} VNĐ</span>
                <br></br>
                <a > Kho: </a><span className="fw-bold h5 me-2">{product.quantity}</span><a></a>
              </div>
              <div className="mb-3">
                <div className="d-inline float-start me-2">
                  <div className="input-group input-group-sm mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={handleMinusClick}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      value={valueproduct}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={handlePlusClick}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                </div>
                {product.quantity > 0 && user != null ? (
                  <>
                    <>
                      <Link to="/cart" className="btn btn-sm btn-primary me-2"
                        onClick={(event) => handleSubmit(product.id, user.id, event)}>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary me-2"
                          title="Add to cart"
                        >
                          <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                        </button>
                      </Link>

                      {/* <Link to="/checkout" className="btn btn-sm btn-warning me-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-warning me-2"
                          title="Buy now"
                        >
                          <FontAwesomeIcon icon={faShoppingCart} /> Buy now
                        </button>
                      </Link> */}
                    </>


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
                )}
                <br></br>
                <br></br>
                <p className="fw-bold mb-2 small">
                  Mô tả sản phẩm
                </p>
                <ul className="small">
                  <p>
                    {product.description}
                  </p>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="row">
              <div className="col-md-12">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-link active"
                      id="nav-details-tab"
                      data-bs-toggle="tab"
                      href="#nav-details"
                      role="tab"
                      aria-controls="nav-details"
                      aria-selected="true"
                    >
                      Thông số sản phẩm
                    </a>
                  </div>
                </nav>
                <p>
                  Web bán đồ điện tử cung cấp đa dạng sản phẩm công nghệ cao cấp như
                  laptop, Headset, Phone và Tivi từ các thương hiệu nổi tiếng.
                  Với mẫu mã và giá cả phù hợp, đây là lựa chọn hàng đầu cho những
                  người yêu công nghệ.
                </p>
              </div>
            </div> */}
        </div>
        {/* <div className="col-md-4">
            <CardFeaturedProduct data={data.products} />
            <CardServices />
          </div> */}
      </div>
    </div>
  );

}

export default ProductDetailView;
