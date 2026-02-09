import React from 'react';
import { useState } from "react";
import axios from "axios"
import { useForm } from "react-hook-form"
import '../App.css'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const Register = () => {
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors }
  } = useForm(
    {
      defaultValues: {
        userName: "JohnDoe",
        email: "123@example.com",
        password: "12345678"
      }
    }
  );

  // const watchAllFields = watch();
  // console.log("watchAllFields: ", watchAllFields);

  useEffect(() => {
    if (isSubmitted) {
      setMessage("")
      axios.post("/api/register", formData)
        .then((res) => {
          // console.log(res.data);          
          setNewUser(res.data.newUser);
          setMessage(res.data.message);
          setIsRegistered(true);
        })
        .catch((err) => {
          console.error(err);
          setMessage("Something went wrong...")
        })
        .finally(() => {
          setIsSubmitted(false);
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted])

  useEffect(() => {
    if (isRegistered && newUser) {
      navigate("/dashboard")
    }
  }, [isRegistered, navigate, newUser]);

  return (
    <>
      <div>Register: </div>
      <p className="text-orange-400">Message: {message}</p>
      <form className="border-2 w-100 p-3 mt-1.5 flex flex-col justify-between h-70" onSubmit={handleSubmit((data) => {
        console.log("data: ", data);
        setFormData(data)
        setIsSubmitted(true)
      })}>
        <div className="flex justify-between">
          <label className="text-yellow-300">Username: </label>
          <input className='rounded-2xl border-yellow-300 border-2 pl-2 w-1/2 focus:w-3/5 transition-all duration-400' {...register("userName", {
            required: "Username is Required",
            minLength: {
              value: 6,
              message: "Minimum length of Username is 6"
            }
          })} placeholder="First Name" />
        </div>
        <p className="text-red-500 text-sm">{errors.userName?.message}</p>

        <div className="flex justify-between">
          <label className="text-yellow-300">Email: </label>
          <input className='rounded-2xl border-yellow-300 border-2 pl-2 w-1/2 focus:w-3/5 transition-all duration-400' {...register("email", {
            required: "Email is Required",
            // minLength: {
            //   value: 4,
            //   message: "Yo min is 4"
            // }
          })} placeholder="Email" />
        </div >
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <div className="flex justify-between">
          <label className="text-yellow-300">Password: </label>
          <input className='rounded-2xl border-yellow-300 border-2 pl-2 w-1/2 focus:w-3/5 transition-all duration-400' {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "Minimum length of Password is 8 characters"
            }
          })} placeholder="Password" />
        </div>
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        {/* <select {...register("gender")}>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <br /> */}

        <input className='pr-3 pl-3 pt-0.5 pb-0.5 border-yellow-300 border-2' type="submit" />
      </form>
      {/* <Dashboard /> */}
    </>
  )
}

export default Register