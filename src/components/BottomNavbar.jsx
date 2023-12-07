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
    <div className={`fixed bottom-0 z-30 w-screen  h-[9vh] lg:px-36 px-7 flex justify-between items-center rounded-t-xl  nav-shodow ${isDarkMode ? "bg-darkBlue" : "bg-lightBlue "} `}>
      <Link to={'/dashboard1'}>
        {/* <AiOutlineHome className="font-extrabold text-navIcon text-3xl" /> */}
        {
          location.pathname === "/dashboard1" ? <img src="/assets/navigation-icons/home-active.svg" className='object-cover' alt="" /> : <img src="/assets/navigation-icons/home.svg" className='object-cover' alt="" />
        }
      </Link>
      <Link to={'/add-customer'}>
        {/* <AiOutlineUser className="font-extrabold text-navIcon text-3xl" /> */}
        {
          location.pathname === "/customers" ? <img src="/assets/navigation-icons/user-active.svg" className='object-cover' alt="" /> : <img src="/assets/navigation-icons/user.svg" className='object-cover' alt="" />
        }
      </Link>
      <Link to={'/products'}>
        {/* <BsBox className="font-extrabold text-navIcon text-3xl" /> */}
        {
          location.pathname === "/products" ? <img src="/assets/navigation-icons/box-active.svg" className='object-cover' alt="" /> : <img src="/assets/navigation-icons/box.svg" className='object-cover' alt="" />
        }
      </Link>
      <Link to={'/get-bill'}>
        {/* <LuIndianRupee className="font-extrabold text-navIcon text-3xl" /> */}
        {
          location.pathname === "/bill" ? <img src="/assets/navigation-icons/bill-active.svg" className='object-cover' alt="" /> : <img src="/assets/navigation-icons/bill.svg" className='object-cover' alt="" />
        }
      </Link>
    </div>
  )
}

export default BottomNavbar
