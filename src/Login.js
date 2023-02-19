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
    const onSubmit =  data => {
         fetch('http://localhost:3003/customer/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(response => {
                let answer=response;
                if(answer===null)
                    alert("Wrong details were inserted")
                setUser(answer)
                if (answer.id_Type===1) {
                    navigate('/customer')
                }
                else {
                    navigate('/manager')
                 }
            })
            .catch(err => {alert("Wrong details were inserted");}
            )
    };

    return (
        <div class="formName" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("id")} placeholder="ID" />
                <p>{errors.id?.message}</p>

                <input {...register("password")} placeholder="Password" />
                <p>{errors.password?.message}</p>

                <input  id= "button" type="submit" value={"Submit"}/>
            </form>
            <Link to={"/SignIn"}> New Customer? please sign in first!</Link>
        </div>
    );
}














