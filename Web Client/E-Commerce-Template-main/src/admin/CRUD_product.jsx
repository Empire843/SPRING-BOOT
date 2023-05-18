import React, { useState, useEffect } from "react";
import "./admincss/admin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import numeral from 'numeral';
import Search from "../components/Search";

const CRUD_productView = () => {
    const [products, setProducts] = useState([]);
    const [formValues, setFormValues] = useState({
        id: "",
        name: "",
        image: "",
        quantity: "",
        price: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:8080/api/products/all");
            setProducts(result.data);
        };
        fetchData();
    }, []);




    const handleDeleteProduct = (id) => {
        console.log("id" + id);
        axios.delete(`http://localhost:8080/api/products/delete/${id}`);
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleSearch = (searchResults) => {
        const products = searchResults;
        setProducts(products);
    };


    return (
        <div className="container">
            <h1>Product List</h1>
            <Link to={`/admin/cu-product/-1`}>
                <button
                    type="button"
                    className="btn btn-primary mb-3"
                >
                    Add New
                </button>
            </Link>
            <div style={{ justifyContent: "center", width: "80%" }} >
                <Search onSearch={handleSearch}></Search>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>

                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img src={product.image} alt={product.name} style={{ width: '200px', height: '150px' }} />
                            </td>

                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{numeral(product.price).format('0,0')}</td>
                            <td>
                                <Link to={`/admin/cu-product/${product.id}`}>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    // onClick={() => handleEditProduct(product)}
                                    >
                                        Edit
                                    </button>{" "}
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteProduct(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default CRUD_productView;