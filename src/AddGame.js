import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// const [customers, setCustomers] = useState([]);

const schema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  minimalAge: yup.number().integer().required(),
  maximalAge: yup.number().integer().required(),
  company: yup.string().required(),
  game_id: yup.string().required(),
  gameTime: yup.number().integer().required(),
  existingNumber: yup.number().integer().required(),
}).required();

export default function LogInManager() {}
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // const addCustomer = (data) => {

  // }
  const onSubmit = data => {
    console.log(data, "data")
    fetch(`http://localhost:3000/LogInManager/games`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(response => {console.log(response); alert("Adding a game was done successfully!")})
      .catch(err => alert("ERROR"))
    navigate('/App')
  }