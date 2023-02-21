import '../App.scss';
import { userInfo } from "os";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'


export default function ViewC({ customer }) {
    const navigate = useNavigate();
    const [customerN, setCustomer] = useState(customer);
    const customerCode = customer.code;
    const disableCustomer = (id) => {
        fetch(`http://localhost:3003/customer/disabledCustomer`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => response.json())
            .then(data => {
                if (data) {

                    navigate("/Login");
                    setCustomer(data);
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('you got problem in your details ')
            })

    }

    return <div id="BorrowedGame">
        <button onClick={() => { navigate(-1) }}>Back</button>
        <h1>Hello {customer.name}</h1>
        <lable> Id: {customer.id}</lable>
        <br></br>
        <lable>Password:  {customer.password}</lable>
        <br></br>
        <lable> City: {customer.city}</lable>
        <br></br>
        <lable>Phone:{customer.phone}</lable>
        <br></br>
        <lable> Number of games for borrowing: {customer.gamesNumber}</lable>
        <br></br>

    </div>
}