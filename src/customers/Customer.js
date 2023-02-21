import '../App.scss';
import { userInfo } from "os";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function BorrowedGame({ customer }) {
    const [customerStatus,setStatus]=useState(customer.status);
    const navigator=useNavigate();
    const [borrowedgame, setborrowedgame] = useState([]);
    const [canBorrowGame, setcanBorroGame] = useState(1);
    const customerId = customer.id;
    const costomerStatus = customer.status;
    useEffect(() => {
        fetch(`http://localhost:3003/customer/myBorrowedGames/${customerId}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setborrowedgame(data);
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('failed to connect to the server')
            })
        canBorrow(customerId);
    }, [])
    const returnGame = (id, game_id) => {
        fetch(`http://localhost:3003/customer/return/returnGame`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
                //     // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ id: id, game_id: game_id })
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const withoutgame = borrowedgame.filter(x => x.id !== id);
                    setborrowedgame([...withoutgame]);
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('you er got problem in your details ')
            })

    }
    const canBorrow = (customerId) => {
        fetch(`http://localhost:3003/customer/canborrow/${customerId}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setcanBorroGame(1);
                }
                else {
                    setcanBorroGame(0);
                }
            })
            .catch((err) => {
                alert('cant get borrow ', err)
            })

    }
    const ablecustomer=(id)=>{
        fetch(`http://localhost:3003/customer/ableCustomer`, {
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
                    setStatus(0);
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
        
        customerStatus == 1 ? <div><button onClick={()=>{navigator("/Login")}}>Back</button><h3>You are suspended.</h3><br/><button onClick={()=>ablecustomer(customer.id)}>Go Active!</button> </div> :
            <div id="BorrowedGame">
                <button onClick={()=>navigator("/Login")}>Back</button>
                <h2>Hello {customer.name}</h2>
                <Link to={"/gallary/Gallery"}> Our Games</Link>
                <br />
                <Link to={"/customers/ViewC"}> See My Details</Link>
                <h3>Borrowed Game</h3>
                {
                    borrowedgame.map(e =>
                        <div key={e.id}>
                            <lable>{e.name} {e.borrowDate}  </lable>

                            <input id='button' type='submit' value='Return' onClick={() => returnGame(e.id, e.game_id)} />
                        </div>
                    )
                }
                {(canBorrowGame == 1) ?
                    <Link to={"/gallary/BorrowGame"}>BorrowingGame</Link> :

                    <lable>You can't take another game, before returning the games you've taken!</lable>
                }
            </div>
    )
}