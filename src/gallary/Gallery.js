import '../App.scss';
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

export default function GameGallery({ customer }) {
    const [allGames, setgames] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:3003/customer/games/GameGallery`, { method: "GET" })
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
    const availableonly = () => {
        let checked = document.getElementById("myCheck").checked;
        if (checked) {
            fetch(`http://localhost:3003/customer/games/AllAvailable`, {
                method: "GET",
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setgames(data)
                    }
                    else {
                        alert('wrong');
                    }
                })
                .catch((err) => {
                    alert('cant get borrow ', err)
                })
        }
        else {
            fetch(`http://localhost:3003/customer/games/GameGallery`, { method: "GET" })
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
        }
    }

    const knowGame = (game_id) => {
        fetch(`http://localhost:3003/customer/knowgame/${game_id}/${customer.code}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    alert('You have already taken this game');
                }
                else {
                    alert('Do you want to try? This is a new game');
                }
            })
            .catch((err) => {
                alert('we are having a problem');
            })
    }



    return (
        customer.id_Type == 1 ? <div className='games-frame'><button id="BackButton" onClick={() => navigate('/customers/customer')}>Back</button>
            <h3>Our Games</h3>
            <input type="checkbox" id="myCheck" onChange={() => availableonly()} />
            <label for="myCheck">show only games which are available for borrowing</label>
            {
                <div>

                    {allGames.map(x => <div className="game-card" key={x.code}>
                        <div><label>name:</label> <label>{x.name}</label></div>
                        <div><label>minimalAge:</label>  <label>{x.minimalAge}</label></div>
                        <div><label>maximalAge:</label>  <label>{x.maximalAge}</label></div>
                        <div><label>company:</label> <label>{x.company}</label></div>
                        <div><label>minutesDuration:</label> <label>{x.minutesDuration}</label></div>
                        <div><label>existingNumber:</label> <label>{x.existingNumber}</label></div>
                        <button onClick={() => knowGame(x.id)}> Do I know it? </button>
                    </div>)}

                </div>}
        </div> : <div><button onClick={() => navigate('/manager')}>Back</button>
            <h3>Our Games</h3>
            <input type="checkbox" id="myCheck" onChange={() => availableonly()} />
            <label for="myCheck">show only games which are available for borrowing</label>
            {
                <div>
                    <table>
                        {allGames.map(x => 
                        <tr key={x.code}>
                            {/* <label>{x.name}</label>
                            <label>{x.minimalAge}</label>
                            <label>{x.maximalAge}</label>
                            <label>{x.company}</label>
                            <label>{x.minutesDuration}</label>
                            <label>{x.existingNumber}</label> */}

                            <div><label>name:</label> <label>{x.name}</label></div>
                        <div><label>minimalAge:</label>  <label>{x.minimalAge}</label></div>
                        <div><label>maximalAge:</label>  <label>{x.maximalAge}</label></div>
                        <div><label>company:</label> <label>{x.company}</label></div>
                        <div><label>minutesDuration:</label> <label>{x.minutesDuration}</label></div>
                        <div><label>existingNumber:</label> <label>{x.existingNumber}</label></div>
                        </tr>)}
                    </table>
                </div>}
        </div>)
}