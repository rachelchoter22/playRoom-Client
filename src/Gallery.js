import './App.css';
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

export default function GameGallery({ customer }) {
    const [allGames, setgames] = useState([]);
const navigate=useNavigate();
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
        let checked=document.getElementById("myCheck").checked;
        if(checked){
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
            })}
        else{
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
        }}

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
        customer.id_Type == 1 ? <div><button id="BackButton" onClick={()=>navigate('/customer')}>Back</button>
        <h3>Our Games</h3>
        <input type="checkbox" id="myCheck" onChange={()=>availableonly()}/>
        <label for="myCheck">show only games which are available for borrowing</label>
        {
            <div>
                <table class="tableDeco">
                    {allGames.map(x => <tr class="rowInTable" key={x.code}>
                        <td>{x.name}</td>
                        <td>{x.minimalAge}</td>
                        <td>{x.maximalAge}</td>
                        <td>{x.company}</td>
                        <td>{x.minutesDuration}</td>
                        <td>{x.existingNumber}</td>
                        <td><button onClick={() => knowGame(x.id)}> Do I know it? </button></td>
                    </tr>)}
                </table>
            </div>}
    </div>: <div><button onClick={()=>navigate('/manager')}>Back</button>
    <h3>Our Games</h3>
        <input type="checkbox" id="myCheck" onChange={()=>availableonly()}/>
        <label for="myCheck">show only games which are available for borrowing</label>
        {
            <div>
                <table>
                    {allGames.map(x => <tr key={x.code}>
                        <td>{x.name}</td>
                        <td>{x.minimalAge}</td>
                        <td>{x.maximalAge}</td>
                        <td>{x.company}</td>
                        <td>{x.minutesDuration}</td>
                        <td>{x.existingNumber}</td>
                    </tr>)}
                </table>
            </div>}
    </div>)
}