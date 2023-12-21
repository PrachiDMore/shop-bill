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
import ButtonNew from "../../components/Button/ButtonNew";

const MainNew = () => {
  const initialstate = {
    businessLogo: "",
    businessName: "",
    businessType: "",
    gstNo: "",
    location: "",
  };
  const [formState, setformState] = useState(initialstate);
  const { isDarkMode } = ThemeContextAuth();
  const { setBusiness, logoUrl, setUserLoading } = ContextAuth();
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

  const handleChange = (e) => {
    setformState({
      ...formState,
      [e.target.id]: e.target.value,
    });
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
          console.log(response)
          setformState(response);
          setBusiness(response);
          if (
            res.data.response[0]?.businessName ||
            res.data.response[0]?.businessType ||
            res.data.response[0]?.gstNo ||
            res.data.response[0]?.location
          ) {
          } else {
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
      <Sidebar title={"Profile"} />
      <form onSubmit={handleSubmit} className="w-screen min-h-screen pt-20 z-50">
        <ImageUploadComponent businessLogo={formState?.businessLogo} setformState={setformState} formState={formState} />
        <div className="w-screen lg:px-40 px-7 lg:pt-10 pt-4 flex flex-col lg:flex lg:gap-8 gap-5 ">
          <div className="grid lg:grid-cols-2 lg:gap-8 gap-5">
            <InputNew id={"businessName"} required={true} value={formState?.businessName} onChange={handleChange} className={'w-full'} placeholder={'Business name'} icon={'/assets/business.svg'} />
            <InputNew id={"businessType"} required={true} value={formState?.businessType} onChange={handleChange} className={'w-full'} placeholder={'Business type'} icon={'/assets/business-type.svg'} />
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-8 gap-5">
            <InputNew id={"gstNo"} required={true} value={formState?.gstNo} onChange={handleChange} placeholder={'GST number'} icon={'/assets/gst-no.svg'} />
            <InputNew id={"location"} required={true} value={formState?.location} onChange={handleChange} placeholder={'Location'} icon={'/assets/location.svg'} />
          </div>
          <ButtonNew type={"submit"} className={'w-40'} text={'Save'} />
        </div>
      </form>

    </LayoutNew>
  )
}

export default MainNew
