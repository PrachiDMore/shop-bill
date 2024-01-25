import React, { useEffect, useRef, useState } from "react";
import { ContextAuth } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { ThemeContextAuth } from "../context/ThemeContext";
import { BsSun } from "react-icons/bs";
import { GrPowerShutdown } from "react-icons/gr";
import { toast } from "sonner";
import LogoutModal from "../Modal/LogoutModal";
import { BiArrowBack } from "react-icons/bi";


const Sidebar = ({ title, back }) => {
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
      {back ? <div className="h-16 absolute top-0 left-0 z-[80] w-full transition duration-300 ease-in-out ">
        <div className={` dark:text-white text-black flex justify-between items-center h-16 px-4 `} >
          <button onClick={back} className={`flex justify-center items-center rounded-full p-2`} >
            <BiArrowBack className="text-xl dark:text-white text-black" />
          </button>
          <div className={`   font-semibold  text-xl ${isDarkMode ? " text-white" : " text-gray-800"} `} > {title} </div>
          <button onClick={() => { setModal({ show: true }); }} className={`flex justify-center items-center rounded-full p-2 dark:text-white text-black`} >
            <GrPowerShutdown className="dark:text-white text-black" />
          </button>
          <button className={`hidden rounded-full p-2 `} onClick={() => toggleMode()}>
            {isDarkMode ? <BsSun className="dark:text-white text-black" /> : <MdOutlineDarkMode className="dark:text-white text-black" />}
          </button>
        </div>
      </div> : <div className="h-16 absolute top-0 left-0 z-[80] w-full transition duration-300 ease-in-out ">
        <div className={`  flex justify-between items-center h-16 px-4 `} >
          <button onClick={() => { setModal({ show: true }); }} className={`flex justify-center items-center rounded-full p-2 dark:text-white text-black`} >
            <GrPowerShutdown className="dark:text-white text-black" />
          </button>
          <div className={`   font-semibold  text-xl ${isDarkMode ? " text-white" : " text-gray-800"} `} > {title} </div>
          <button className={`rounded-full p-2 dark:text-white text-black`} onClick={() => toggleMode()} >
            {isDarkMode ? <BsSun className="dark:text-white text-black" /> : <MdOutlineDarkMode className="dark:text-white text-black" />}
          </button>
        </div>
      </div>}
    </>
  );
};

export default Sidebar;
