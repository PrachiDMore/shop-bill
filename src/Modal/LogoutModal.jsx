import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ThemeContextAuth } from "../context/ThemeContext";

const LogoutModal = ({ setModel }) => {
  const { isDarkMode } = ThemeContextAuth();
  const naviGate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    window.location.reload();
    naviGate('/login')
  };
  return (
    <>
      <div className="h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center fixed top-0 left-0 shadow-lg z-[20000] ">
        <div
          className={
            "relative h-[25vh] w-[80vw] md:w-[50vw]  dark:bg-gray-900 bg-white rounded-lg md:h-[50vh]"
          }
        >
          <div className="flex justify-center items-center flex-col h-full gap-y-5 px-5 text-center">
            <p
              className={`font-semibold text-xl `}
            >
              Are you sure you want to logout ?
            </p>
            <div className="flex justify-center items-center gap-x-5">
              <button
                onClick={() => {
                  setModel({ show: false });
                }}
                className=" font-bold bg-blue-600 text-white py-3 rounded-md w-28"
              >
                Cancel
              </button>
              <button
                className=" font-bold bg-red-600 text-white py-3 rounded-md w-28"
                onClick={logout}
              >
                {" "}
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
