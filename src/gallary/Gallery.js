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

    const knowGame = (gameId) => {
        fetch(`http://localhost:3003/customer/knowgame/${gameId}/${customer.Id}`, {
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
        customer.CustomerTypeId == 1 ? <div className='games-frame'>
            <button className='back-icon' onClick={() => navigate('/customers/customer')}>Back</button>
            <h3>Our Games</h3>
            <input type="checkbox" id="myCheck" onChange={() => availableonly()} />
            <label for="myCheck">show only games which are available for borrowing</label>
            {
                <div className='game-list'>

                    {allGames.map(x => <div className="game-card" key={x.Id}>
                        <img src={require(`../../public/images/${x.imageName}.jpg`)} />
                        <div><label>name:</label> <label>{x.Name}</label></div>
                        <div><label>minimalAge:</label>  <label>{x.MinimalAge}</label></div>
                        <div><label>maximalAge:</label>  <label>{x.MaximalAge}</label></div>
                        <div><label>company:</label> <label>{x.Company}</label></div>
                        <div><label>minutesDuration:</label> <label>{x.MinutesDuration}</label></div>
                        <div><label>existingNumber:</label> <label>{x.ExistingNumber}</label></div>
                        <button className='clock-rotate-left-icon' onClick={() => knowGame(x.Id)}> Do I know it? </button>
                    </div>)}

                </div>}
        </div> : <div  className='games-frame'><button className='back-icon' onClick={() => navigate('/manager')}>Back</button>
            <h3>Our Games</h3>
            <input type="checkbox" id="myCheck" onChange={() => availableonly()} />
            <label for="myCheck">show only games which are available for borrowing</label>
            {
                <div className='game-list'>
                    {allGames.map(x =>
                        <div className="game-card" key={x.id}>
                            <img src={require(`../../public/images/${x.imageName}.jpg`)} />
                            <div><label>name:</label> <label>{x.Name}</label></div>
                            <div><label>minimalAge:</label>  <label>{x.MinimalAge}</label></div>
                            <div><label>maximalAge:</label>  <label>{x.MaximalAge}</label></div>
                            <div><label>company:</label> <label>{x.Company}</label></div>
                            <div><label>minutesDuration:</label> <label>{x.MinutesDuration}</label></div>
                            <div><label>existingNumber:</label> <label>{x.ExistingNumber}</label></div>
                        </div>
                    )}
                </div>}
        </div>)
}