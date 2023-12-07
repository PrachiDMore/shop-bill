import React from 'react'

const ButtonNew = ({ text, className, type }) => {
  return (
    <div>
      <button type={type} className={'bg-mediumBlue text-white w-full py-3 rounded-lg ' + className}>{text}</button>
    </div>
  )
}

export default ButtonNew
