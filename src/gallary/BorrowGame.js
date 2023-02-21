import '../App.scss';
import { userInfo } from "os";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";


const schema = yup.object({
    age: yup.number().positive(),
}).required();

export default function AddBorrowedGame({ customer }) {
    const navigate = useNavigate()
    const [gamesAvailable, setgames] = useState([]);

    const customerCode = customer.code;
    useEffect(() => {
        fetch(`http://localhost:3003/customer/games/AllAvailable`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setgames(data);
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('failed to connect to the server')
            })
    }, [])
    const borrowGame = (customer_code, game_id) => {
        fetch(`http://localhost:3003/customer/borrow/borrowgame`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
                //     // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ customer_code: customer_code, game_id: game_id })
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const afterBorrowed = gamesAvailable;
                    alert('The game was borrowed')
                    setgames(afterBorrowed);
                    navigate(-1);
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
        <h3>Games To Borrow</h3>
        {
            gamesAvailable.map(e =>
                <div key={e.id}>
                    <lable>{e.name} {e.id}</lable>
                    <input class="submit-btn" type='submit' value='Borrow' onClick={() => borrowGame(customerCode, e.id)} />
                </div>
            )
        }
    </div>
}