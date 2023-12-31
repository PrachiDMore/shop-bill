import React from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { LuIndianRupee } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { ThemeContextAuth } from "../context/ThemeContext";

const Navigation = ({ className }) => {
  const { isDarkMode } = ThemeContextAuth();
  const loaction = useLocation();
  const routes = [
    {
      lable: "Home",
      icon: <AiOutlineHome className="font-extrabold text-4xl" />,
      route: "/dashboard",
    },
    {
      lable: "Add Customer",
      icon: <AiOutlineUser className="font-extrabold text-4xl" />,
      route: "/add-customer",
    },

    {
      label: "Products",
      icon: <BsBox className="font-extrabold text-4xl" />,
      route: "/products",

    },

    {
      lable: "Get Bill",
      icon: <LuIndianRupee className="font-extrabold text-4xl" />,
      route: "/get-bill",
    },
  ];
  return (
    <>
      <nav className={`fixed bottom-0 z-30 w-screen  h-[8vh] flex justify-center rounded-t-xl  drop-shadow-2xl ${isDarkMode ? "bg-blue-700" : "bg-lightBlue "} `}>
        <div className={`flex items-center justify-between w-full   px-10  ${isDarkMode ? "text-white text-opacity-75 " : "text-navIcon "} `}>
          {routes.map((obj, index) => {
            return (
              <Link
                to={obj.route}
                key={index}
                className={
                  obj.route === loaction.pathname ? `flex flex-center md:items-center md:justify-center text-center md:w-4/12 pt-1  text-sm font-semibold rounded-lg ` : "flex flex-center md:items-center md:justify-center text-center md:w-4/12 pt-1 text-sm "
                }
              >
                {obj.icon}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
