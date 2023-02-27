import '../App.scss';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'


export default function ViewC({ customer }) {
    const navigate = useNavigate();
    const [customerN, setCustomer] = useState(customer);
    const customerCode = customer.Id;
    const disableCustomer = (Id) => {
        fetch(`http://localhost:3003/customer/disabledCustomer`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Id: Id })
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

    return <div className='borrow-gmaes-frame'>
        <button className="back-icon" onClick={() => { navigate(-1) }}>Back</button>
        <span className='user-image-2'></span>
        <h1>Hello {customer.Name}</h1>
        <div> Id: {customer.Id}</div>
        <div>Password:  {customer.Password}</div>
        <div> City: {customer.City}</div>
        <div>PhoneNumber: {customer.PhoneNumber}</div>
        <div> Number of games for borrowing: {customer.GamesNumber}</div>
    </div>
}