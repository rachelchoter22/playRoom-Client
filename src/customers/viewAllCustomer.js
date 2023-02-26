import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const navigator = useNavigate();
    useEffect(() => {
        showAllCustomer();
    }, [])
    const showAllCustomer = () => {
        fetch(`http://localhost:3003/manager/CustomerGallery/allCustomers`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setCustomers(data);
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('failed to connect to the server')
            })

    }
    const disableCustomer = (Id) => {
        fetch(`http://localhost:3003/customer/disabledCustomer`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
                //     // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ Id: Id })
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    showAllCustomer();
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('you er got problem in your details ')
            })
    }

    return (
        <div className="users-frame">
            <button onClick={() => navigator(-1)}>Back</button>
            <div className="user-list">
                {customers.map(x => <div className="user-card" key={x.Id}>
                    <div>id: {x.Id}</div>
                    <div>password: {x.Password}</div>
                    <div>Name: {x.Name}</div>
                    <div>City: {x.City}</div>
                    <div>PhoneNumber: {x.PhoneNumber}</div>
                    <div>GameId: {x.GameId}</div>
                    <div>Status: {x.Status}</div>
                    <div><button className="suspend-icon" onClick={() => disableCustomer(x.Id)}>Suspened</button></div>
                </div>)}
            </div>
        </div>
    )
}