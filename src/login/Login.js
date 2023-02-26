import React from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

const schema = yup.object({
    password: yup.string().required(),
    userName: yup.string().required(),
}).required();

export default function Login({ setUser }) {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        fetch('http://localhost:3003/customer/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(response => {
                let answer = response;
                if (answer === null)
                    alert("Wrong details were inserted")
                setUser(answer)
                if (answer.CustomerTypeId === 1) {
                    navigate('/customers/customer')
                }
                else {
                    navigate('/manager')
                }
            })
            .catch(err => { alert("Wrong details were inserted"); }
            )
    };

    return (
        <div >
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input className="userName-field" {...register("userName")} placeholder="user name" />
                <label className="error-massage">{errors.userName?.message}</label>

                <input className="password-field" {...register("password")} placeholder="Password" />
                <label className="error-massage">{errors.password?.message}</label>

                <button className="submit-btn enter-icon" type="submit" >Login</button>
                <Link to={"/login/SignIn"}> New Customer? please sign in first!</Link>

            </form>
        </div>
    );
}














