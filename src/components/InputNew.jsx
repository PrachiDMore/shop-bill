import React from 'react'
import { AiOutlineShop } from "react-icons/ai"

const InputNew = ({label,type,placeholder,id,onChange,value,name,className,readOnly = false,accept,icon}) => {
  return (
    <div className='flex flex-col gap-1'>
      {label && <label className='font-semibold' htmlFor={id}>{label}</label>}
      <div className={'flex w-full gap-4 items-center px-4 py-3 rounded-lg shadow-md bg-lightBlue ' + className} >
        {/* <AiOutlineShop className='text-xl'/> */}
        <div><img src={icon} alt="" /></div>
        <input className='placeholder:text-sm outline-none bg-transparent' type={type} onChange={onChange} id={id} name={name} readOnly={readOnly} value={value} placeholder={placeholder} />
      </div>
    </div>
  )
}

export default InputNew
