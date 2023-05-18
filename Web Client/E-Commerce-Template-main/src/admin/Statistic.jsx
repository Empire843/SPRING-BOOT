import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import moment from 'moment';
import axios from 'axios';


import "react-datepicker/dist/react-datepicker.css";
import "./admincss/statistic.css";
import { defaultFormat } from "numeral";
import numeral from 'numeral';
const initialFormValues = {
    fromDate: null,
    toDate: null,
};

const StatisticView = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [data, setData] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDateChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleViewClick = async () => {
        // const formattedFromDate = `${formValues.fromDate.toLocaleDateString()}-${formValues.fromDate.toLocaleTimeString().split(':').slice(0, 2).join(':')}`;
        // const formattedToDate = `${formValues.toDate.toLocaleDateString()}-${formValues.toDate.toLocaleTimeString().split(':').slice(0, 2).join(':')}`;

        // const date = moment(dateString);
        const formattedFromDate = moment(formValues.fromDate).format('DD/MM/YYYY-HH:mm');
        const formattedToDate = moment(formValues.toDate).format('DD/MM/YYYY-HH:mm');
        console.log(formattedFromDate);
        console.log(formattedToDate);
        // http://localhost:8080/api/revenue/statistics?start=10/05/2023-00:00&end=11/05/2023-00:00http://localhost:8080/api/revenue/statistics?start=10/05/2023-00:00&end=11/05/2023-00:00

        try {
            const response = await axios.get('http://localhost:8080/api/revenue/statistics', {
                params: {
                    start: formattedFromDate,
                    end: formattedToDate,
                }
            });
            // alert(JSON.stringify(response.data));
            setData(response.data);
            // alert(data[0].id)
            // console.log("test"+data[0].id)
            // alert(data.length)
        } catch (error) {
            console.error(error);
        }
        // alert((await response).data)

    };

    // Calculate total
    const total = data.reduce(
        (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.quantity,
        0
    );

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                    <label htmlFor="fromDate">From Date</label>
                    <DatePicker
                        id="fromDate"
                        name="fromDate"
                        selected={formValues.fromDate}
                        onChange={(value) => handleDateChange("fromDate", value)}
                        dateFormat="dd/MM/yyyy"
                        required
                        isClearable
                    />
                </div>
                <div style={{ marginRight: '10px' }}>
                    <label htmlFor="toDate">To Date</label>
                    <DatePicker
                        id="toDate"
                        name="toDate"
                        selected={formValues.toDate}
                        onChange={(value) => handleDateChange("toDate", value)}
                        dateFormat="dd/MM/yyyy"
                        required
                        isClearable
                    />
                </div>
                <button style={{ padding: '5px 10px', fontSize: '16px' }} type="button" onClick={handleViewClick}>
                    View
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id Product</th>
                        <th style={{ marginLeft: '50px' }}>Image Product</th>
                        <th>Name Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.productId}>
                            <td>{item.productId}</td>
                            <td>
                                <img src={item.productImage} alt={item.productName} style={{ width: '250px', height: '150px' }} />
                            </td>
                            <td>{item.productName}</td>
                            <td>{item.totalQuantity}</td>
                            <td>{numeral(item.totalPrice).format('0,0')}</td>

                            <td>{numeral(item.totalQuantity * item.totalPrice).format('0,0')}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="5" className="text-end fw-bold">Total:</td>
                        <td>
                            {numeral(data.reduce((total, item) => total + item.totalQuantity * item.totalPrice, 0)).format('0,0')}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default StatisticView
