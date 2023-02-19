
import React, { useState, useEffect } from "react"
import {Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Manager({ idType }) {
    const [Manager, setManager] = useState([]);
    const navigator=useNavigate();
    useEffect(() => {
        
    },[])
    return <div id="Manager">
        <button onClick={()=>navigator("/Login")}>Back</button>
        <h3>Manager</h3>
        <Link to={"/Gallery"}>Games</Link><br></br><br></br>
        <Link to={"/viewAllCustomers"}>Customers</Link>
    </div>
}