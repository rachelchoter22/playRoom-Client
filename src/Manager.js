
import React, { useState, useEffect } from "react"
import {Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Manager({ idType }) {
    const [Manager, setManager] = useState([]);
    const navigator=useNavigate();
    useEffect(() => {
        
    },[])
    return <div className="manager-frame">
        <button className="back-icon" onClick={()=>navigator("/login/Login")}>Back</button>
        <h3>Manager</h3>
        <Link to={"/gallary/Gallery"}>Games</Link><br></br><br></br>
        <Link to={"/customers/viewAllCustomers"}>Customers</Link>
    </div>
}