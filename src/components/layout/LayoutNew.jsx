import React from 'react'
import { ThemeContextAuth } from "../../context/ThemeContext";
import BottomNavbar from '../BottomNavbar';
import Sidebar from '../Sidebar';

const LayoutNew = ({ children, className }) => {
  const { isDarkMode } = ThemeContextAuth();

  return (
    <div className={`w-screen min-h-screen relative h-fit ${className} ${isDarkMode ? "bg-[#111827]" : "bg-white"} text-${isDarkMode ? "white" : "gray-800"} `}>
      <div className={`lg:hidden w-full h-96 z-0 rounded-full ${isDarkMode ? "bg-[#111827]" : "bg-lightBlue"} absolute -top-48 left-0`}></div>
      <div className='z-10'>{children}</div>
      <BottomNavbar />
    </div>
  )
}

export default LayoutNew
