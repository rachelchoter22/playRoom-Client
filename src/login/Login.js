import React from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

const schema = yup.object({
    password: yup.string().required(),
    id: yup.string().required(),
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
                if (answer.id_Type === 1) {
                    navigate('/customer')
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
            <form class="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input class="id-field" {...register("id")} placeholder="ID" />
                <label class="error-massage">{errors.id?.message}</label>

                <input class="password-field" {...register("password")} placeholder="Password" />
                <label class="error-massage">{errors.password?.message}</label>

                <input class="submit-btn" type="submit" value={"Submit"} />            <Link to={"/login/SignIn"}> New Customer? please sign in first!</Link>

            </form>
        </div>
    );
}














