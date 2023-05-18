import React, { Component, lazy, useState, useEffect, useCallback } from "react";
import "./admincss/cu_product.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import numeral from 'numeral';
// const categories = ["Category 1", "Category 2", "Category 3"];

const CU_productView = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);

    useEffect(() => {
        try {
            fetch("http://localhost:8080/api/categories/all")
                .then(res => res.json())
                .then(data => {
                    setCategories(data);
                    setIsCategoriesLoaded(true);
                    console.log("size" + data.length);
                })


        } catch (error) {
            console.error(error);
        }


    }, []);

    useEffect(() => {
        console.log("cartid" + id && isCategoriesLoaded);
        if (id !== -1) {
            console.log("id" + id);
            fetch(`http://localhost:8080/api/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    setImage(data.image);
                    setName(data.name);
                    setQuantity(data.quantity);
                    setPrice(data.price);
                    setDescription(data.description);
                    setCategory(data.category.id);
                    console.log("category " + data.category.id);
                    // console.log("category " + categories[data.category.id - 1].name);
                })
                .catch(error => console.log(error));
        }
    }, [id, isCategoriesLoaded]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("id" + id);
        console.log("category_id" + category);
        console.log("name" + name);
        console.log("price" + price);
        console.log("description" + description);
        console.log("quantity" + quantity);
        console.log("image" + image);
        console.log("aaaaaaaaaaa");


        if (id === "-1") {
            // console.log("aaaaaaaaaaaaaaaaaaaaaaa");
            // Handle POST request
            axios.post(`http://localhost:8080/api/products/add`, {
                "category_id": category,
                "name": name,
                "price": price,
                "description": description,
                "quantity": quantity,
                "image": image
            })
                .then((response) => {
                    console.log("status add" + response.data);
                    window.location.href = '/admin/crud-product';

                })
                .catch((error) => {
                    console.log(error);
                    // Xử lý lỗi
                    // ...
                });
        } else {
            // Handle PUT request
            axios.put(`http://localhost:8080/api/products/edit/${id}`, {
                "category_id": category,
                "name": name,
                "price": price,
                "description": description,
                "quantity": quantity,
                "image": image

            })
                .then((response) => {
                    console.log(response.data);
                    window.location.href = '/admin/crud-product';
                    // Xử lý phản hồi từ API
                    // ...
                })
                .catch((error) => {
                    console.log(error);
                    // Xử lý lỗi
                    // ...
                });
        }
    };


    const handleCancel = () => {
        // TODO: Handle cancel button click
        console.log("Cancelled");
    };

    return (
        <div className="container">

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {image ? (
                        <img src={image} alt="Product" className="img-fluid mt-3" style={{ width: '300px', height: '200px' }} />
                    ) : (
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Default"
                            className="img-fluid mt-3"
                        />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        className="form-control"
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className="form-group">
                    {/* to={'/admin/crud-product'} */}
                    {/* <Link > */}
                    <button type="submit" className="submit-button">
                        Update
                    </button>
                    {/* </Link> */}
                </div>
            </form>
        </div>
    );
};
export default CU_productView;
