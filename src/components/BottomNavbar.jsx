import React from 'react'
import { ThemeContextAuth } from "../context/ThemeContext";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { LuIndianRupee } from "react-icons/lu";
import { Link, useLocation } from 'react-router-dom';

const BottomNavbar = () => {
  const { isDarkMode } = ThemeContextAuth();
  const location = useLocation()
  return (
    <div className={`fixed bottom-0 z-[5000] w-screen  h-[9vh] lg:px-36 px-7 flex justify-between items-center rounded-t-xl  nav-shodow ${isDarkMode ? "bg-darkBlue" : "bg-lightBlue "} `}>
      <Link to={'/dashboard'}>
        {/* <AiOutlineHome className="font-extrabold text-navIcon text-3xl" /> */}
        {
          location.pathname === "/dashboard" ? <img src="/assets/navigation-icons/home-active.svg" className='object-cover' alt="" /> : <img src="/assets/navigation-icons/home.svg" className='object-cover' alt="" />
        }
      </Link>
      <Link to={'/customers'}>
        {/* <AiOutlineUser className="font-extrabold text-navIcon text-3xl" /> */}
        {
          location.pathname === "/customers" ? <img src="/assets/navigation-icons/user-active.svg" className='object-cover' alt="" /> : <img src="/assets/navigation-icons/user.svg" className='object-cover' alt="" />
        }
      </Link>
      <Link to={'/products-list'}>
        {/* <BsBox className="font-extrabold text-navIcon text-3xl" /> */}
        {
          location.pathname === "/products-list" ? <img src="/assets/navigation-icons/box-active.svg" className='object-cover' alt="" /> : <img src="/assets/navigation-icons/box.svg" className='object-cover' alt="" />
        }
      </Link>
      <Link to={'/get-bills-all'}>
        {/* <LuIndianRupee className="font-extrabold text-navIcon text-3xl" /> */}
        {
          location.pathname === "/get-bills-all" ? <img src="/assets/navigation-icons/bill-active.svg" className='object-cover' alt="" /> : <img src="/assets/navigation-icons/bill.svg" className='object-cover' alt="" />
        }
      </Link>
    </div>
  )
}

export default BottomNavbar
