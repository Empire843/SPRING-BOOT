import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
const FilterCategory = (props) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories/all");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  }

  useEffect(() => {
    props.onFilter({ category: selectedCategories });
  }, [selectedCategories]);


  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Category
      </div>
      <ul className="list-group list-group-flush show" id="filterPrice">
        {categories.map((category) => (
          <li className="list-group-item">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={'category-${category.id}'}
                value={category.id}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor={'category-${category.id}'}>
                {category.name}  <span className="text-muted"></span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCategory;
