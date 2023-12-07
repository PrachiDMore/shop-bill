import React, { useEffect, useRef, useState } from "react";
import { ContextAuth } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { ThemeContextAuth } from "../context/ThemeContext";
import { BsSun } from "react-icons/bs";
import { GrPowerShutdown } from "react-icons/gr";
import { toast } from "react-toastify";
import LogoutModal from "../Modal/LogoutModal";


const Sidebar = () => {
  const { isDarkMode, toggleMode } = ThemeContextAuth();
  const { userDetails } = ContextAuth();
  const naviGate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [modal, setModal] = useState({ show: false });
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {modal.show && <LogoutModal data={modal.show} setModel={setModal} />}
      <div className="absolute top-0 left-0 z-50 w-full transition duration-300 ease-in-out ">
        {/* <div className=""> */}
        <div className={`  ${isDarkMode ? " text-black" : "text-gray-800" } flex justify-between items-center h-16 px-4 `} >
          <button onClick={() => {setModal({ show: true }); }} className={`flex justify-center items-center rounded-full p-2 text-white`} >
            <GrPowerShutdown />
          </button>

          <div className={`   font-semibold  text-2xl ${isDarkMode ? " text-white" : " text-gray-800"} `} > Profile </div>

          <button className={`rounded-full p-2   ${isDarkMode ? " text-white" : " text-black" } `} onClick={toggleMode} >
            {isDarkMode ? <BsSun className="" /> : <MdOutlineDarkMode />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
