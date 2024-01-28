import React, { useState } from 'react'
import LayoutNew from '../components/layout/LayoutNew'
import InputNew from '../components/InputNew'
import { Link, useNavigate } from 'react-router-dom'
import ButtonNew from '../components/Button/ButtonNew'
import axios from 'axios'
import { toast } from "sonner";

const CreateAccount = ({ nav = false }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      axios('https://khatabook-one.vercel.app/sign-up', {
        method: "POST",
        data: {
          "username": username,
          "phoneNo": password,
          "password": phoneNo
        }
      })
        .then((res) => {
          // localStorage.setItem("token", `${res?.data.token}`);
          navigate("/login");
          toast.success("Success")
        })
        .catch((err) => {
          toast.error(err.message)
        })
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <LayoutNew nav={false}>
      <div className='w-screen min-h-screen flex flex-col lg:gap-8 gap-10 pt-12 relative z-10'>
        <div className='w-screen flex justify-center'>
          <img className='w-28 h-28' src="/logo.png" alt="" />
        </div>
        <h1 className='w-screen text-center text-2xl font-extrabold text-darkBlue'>Create account</h1>
        <form onSubmit={handleSubmit} className='w-screen lg:px-96 px-7 grid gap-10'>
          <div className='grid gap-6'>
            <InputNew value={username} onChange={(e) => setUsername(e.target.value)} icon={'/assets/user.svg'} placeholder={'Username'} type={"text"} />
            <InputNew value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} icon={'/assets/phone.svg'} placeholder={'Phone number'} type={"text"} />
            <InputNew value={password} onChange={(e) => setPassword(e.target.value)} icon={'/assets/password1.svg'} placeholder={'Password'} type={"password"} />
          </div>
          <div className='grid gap-3'>
            <ButtonNew text={'Create Account'} />
            <Link to={'/login'} >
              <ButtonNew type={"button"} text={'Login'} />
            </Link>
          </div>
        </form>
      </div>
    </LayoutNew>
  )
}

export default CreateAccount
