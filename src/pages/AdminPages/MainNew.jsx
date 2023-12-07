import React, { useEffect, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { AiOutlineShop } from "react-icons/ai";
import { IoBusinessOutline } from "react-icons/io5";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploadComponent from "../../components/Input/ImageInput";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import PageLoader from "../../components/PageLoader";
import { useNavigate } from "react-router-dom";
import LayoutNew from '../../components/layout/LayoutNew'
import InputNew from "../../components/InputNew";

const MainNew = () => {

  const { isDarkMode } = ThemeContextAuth();
  const [isEditable, setisEditable] = useState(false);
  const { setBusiness, formState, setformState, logoUrl, setUserLoading } = ContextAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios("https://khatabook-one.vercel.app/updatebusiness", {
        method: "PATCH",
        data: { ...formState },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setisEditable(false);
          setformState(res.data);
          window.location.reload();
          toast.success("Profile updated !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: false,
            theme: "light",
          });
        })
        .catch((err) => {
          toast.error("Something went wrong !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: false,
            theme: "light",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setformState((prevData) => ({
      ...prevData,
    }));
    setisEditable(true);
  };
  const handleChange = (e) => {
    setformState((prevdata) => ({
      ...prevdata,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      await axios("https://khatabook-one.vercel.app/getregisterbusiness", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          const response = res.data.response[0];
          setformState(response);
          setBusiness(response);
          if (
            res.data.response[0]?.businessName ||
            res.data.response[0]?.businessType ||
            res.data.response[0]?.gstNo ||
            res.data.response[0]?.location
          ) {
            setisEditable(false);
          } else {
            setisEditable(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Something went wrong! Please Login Again.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: false,
            theme: "light",
          });
          localStorage.removeItem("token")
          setUserLoading(false)
          navigate('/login')

        });
    } catch (err) {
      toast.error(err?.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: false,
        theme: "light",
      });
    }
  };

  return (
    <LayoutNew>
      <Sidebar title={"Profile"}/>
      <div className="w-screen min-h-screen pt-20 z-50">
        <ImageUploadComponent businessLogo={formState?.businessLogo} setformState={setformState} formState={formState} isEditable={isEditable} setisEditable={setisEditable} />
        <div className="w-screen px-7 grid gap-4 ">
          <InputNew placeholder={'Business name'} icon={<AiOutlineShop className='text-xl'/> }/>
          <InputNew/>
          <InputNew/>
          <InputNew/>
        </div>
      </div>

    </LayoutNew>
  )
}

export default MainNew
