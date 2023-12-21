import React from 'react'
import { AiOutlineShop } from "react-icons/ai"
import { twMerge } from 'tailwind-merge'


const InputNew = ({ label, type, placeholder, id, onChange, value, name, className, readOnly = false, accept, icon, disabled=false, required=false, }) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && <label className='font-semibold' htmlFor={id}>{label}</label>}
      <div className={twMerge(icon ? 'flex w-full gap-4 items-center px-4 py-3 rounded-lg shadow-md dark:bg-white/10 bg-lightBlue ' : 'dark:bg-white/10 flex w-full items-center px-4 py-3 rounded-lg shadow-md bg-lightBlue', className)} >
      {/* <div className={icon ? 'flex w-full gap-4 items-center px-4 py-3 rounded-lg shadow-md bg-lightBlue ' : 'flex w-full items-center px-4 py-3 rounded-lg shadow-md bg-lightBlue ' + className} > */}
        {/* <AiOutlineShop className='text-xl'/> */}
        <div><img src={icon} alt="" /></div>
        <input min={0} disabled={disabled} required={required} className='placeholder:text-sm outline-none bg-transparent w-full' type={type} onChange={onChange} id={id} name={name} readOnly={readOnly} value={value} placeholder={placeholder} />
      </div>
    </div>
  )
}

export default InputNew
