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
      .then(response => { alert("Welcome to the happy family of our playroom's customers") })
      .catch(err => alert("ERROR"))
    navigate('/Login')
  }
  return (
    <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>

      <input {...register("id")} placeholder="ID:" />
      <label className="error-massage">{errors.id?.message}</label>

      <input {...register("name")} placeholder="Name:" />
      <label className="error-massage">{errors.name?.message}</label>

      <input {...register("password")} placeholder="Password:" />
      <label className="error-massage">{errors.password?.message}</label>

      <input {...register("city")} placeholder="City:" />
      <label className="error-massage">{errors.city?.message}</label>

      <input {...register("phone")} placeholder="Phone:" />
      <label className="error-massage">{errors.phone?.message}</label>

      <input {...register("gamesNumber")} placeholder="Games Number:" type="number" />
      <label  className="error-massage">{errors.gamesNumber?.message}</label>

      <button className="submit-btn" type="submit">SignIn</button>
    </form>
  );
}
