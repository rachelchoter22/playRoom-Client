import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// const [customers, setCustomers] = useState([]);

const schema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  name: yup.string().required(),
  city: yup.string().required(),
  phone: yup.string().required(),
  gamesNumber: yup.number().integer().required(),
}).required();

export default function SignIn() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // const addCustomer = (data) => {

  // }
  const onSubmit = data => {
    fetch(`http://localhost:3003/customer/signin`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(response => { alert("Welcome to the happy family of our playroom's customers")})
      .catch(err => alert("ERROR"))
    navigate('/Login')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input {...register("id")} placeholder="ID:" />
      <p>{errors.firstName?.message}</p>

      <input {...register("name")} placeholder="Name:" />
      <p>{errors.lastName?.message}</p>

      <input {...register("password")} placeholder="Password:" />
      <p>{errors.phone?.message}</p>

      <input {...register("city")} placeholder="City:" />
      <p>{errors.email?.message}</p>

      <input {...register("phone")} placeholder="Phone:" />
      <p>{errors.password?.message}</p>

      <input {...register("gamesNumber")} placeholder="Games Number:"  type="number"/>
      <p>{errors.password?.message}</p>

      <button id='button'  type="submit">SignIn</button>
    </form>
  );
}
