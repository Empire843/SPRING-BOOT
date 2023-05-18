import React, { useState, useEffect } from "react";

const FilterPrice = (props) => {
  const [selectedPrice, setSelectedPrice] = useState('');

  const handlePriceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPrice(selectedValue);
    props.onFilter({ price: selectedValue });

    // if (selectedPrice.includes(priceId)) {
    //   setSelectedPrice(selectedPrice.filter(id => id !== priceId));
    // } else {
    //   setSelectedPrice([...selectedPrice, priceId]);
    // }
  };


  // useEffect(() => {
  //   props.onFilter({ price: selectedPrice });
  // }, [selectedPrice]);


  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Price
      </div>
      <ul className="list-group list-group-flush show" id="filterPrice">
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexCheckDefault1"
              value="0-1000000"
              name="category"
              onChange={handlePriceChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              0 - 1.000.000  <span className="text-muted"></span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexCheckDefault2"
              name="category"
              value="1000000-5000000"
              onChange={handlePriceChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              1.000.000 - 5.000.000 <span className="text-muted"></span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexCheckDefault3"
              value="5000000-10000000"

              name="category"
              onChange={handlePriceChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault3">
              5.000.000 - 10.000.000 <span className="text-muted"></span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexCheckDefault4"
              name="category"
              value="10000000-20000000"

              onChange={handlePriceChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault3">
              10.000.000 - 20.000.000 <span className="text-muted"></span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexCheckDefault4"
              name="category"
              value="20000000-100000000"

              onChange={handlePriceChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault3">
              lớn hơn 20.000.000 <span className="text-muted"></span>
            </label>
          </div>
        </li>
      </ul>
    </div>

  );
};

export default FilterPrice;
