import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function Customers() {
const [customers, setCustomers] = useState([]);
const navigator=useNavigate();
useEffect(() => {
    showAllCustomer();
    }, [])
    const showAllCustomer =()=>{
        fetch(`http://localhost:3003/manager/CustomerGallery/allCustomers`,{method:"GET"})
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
const disableCustomer = (id) => {
    fetch(`http://localhost:3003/customer/disabledCustomer`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ id: id})
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
        })}
        
return (
    <div>
        <button onClick={()=>navigator(-1)}>Back</button>
        <table>
            {customers.map(x => <tr key={x.code}>
                <td>{x.code}</td>
                <td>{x.id}</td>
                <td>{x.password}</td>
                <td>{x.name}</td>
                <td>{x.city}</td>
                <td>{x.phone}</td>
                <td>{x.gameId}</td>
                <td>{x.status}</td>
                <td><button onClick={() => disableCustomer(x.id)}>Suspened</button></td>
            </tr>)}
        </table>
    </div>
)}