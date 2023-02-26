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

    const customerId = customer.Id;
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
    const borrowGame = (customerId, gameId) => {
        fetch(`http://localhost:3003/customer/borrow/borrowgame`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
                //     // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ customerId: customerId, gameId: gameId })
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
    return <div id="BorrowedGame" className='games-frame'>
        <h3>Games To Borrow:</h3>
        <div className='game-list'>
            {gamesAvailable.map(e =>
                <div className='game-card' key={e.Id}>
                    <img src={require(`../../public/images/${e.imageName}.jpg`)} />

                    <div><label>name:</label> <label>{e.Name}</label></div>
                    <div><label>minimalAge:</label>  <label>{e.MinimalAge}</label></div>
                    <div><label>maximalAge:</label>  <label>{e.MaximalAge}</label></div>
                    <div><label>minutesDuration:</label> <label>{e.MinutesDuration}</label></div>
                    <div><label>existingNumber:</label> <label>{e.ExistingNumber}</label></div>
                    <input className="submit-btn" type='submit' value='Borrow' onClick={() => borrowGame(customerId, e.Id)} />
                </div>)}
        </div>


    </div>
}