import React from 'react'
import {AiOutlineShop} from "react-icons/ai"

const InputNew = ({ label, placeholder, icon}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='font-semibold' htmlFor="">{label}</label>
      <div className='flex gap-4 items-center px-4 py-3 rounded-lg shadow-md bg-lightBlue'>
        {/* <AiOutlineShop className='text-xl'/> */}
        {icon}
        <input className='outline-none bg-transparent' type="text" placeholder={placeholder} />
      </div>
    </div>
  )
}

export default InputNew
