import React, { useEffect, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import { ThemeContextAuth } from "../../context/ThemeContext";
import "./ProductDetail.css";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { BiArrowBack } from "react-icons/bi";
import Navigation from "../../components/Navigation";
import PageLoader from "../../components/PageLoader";
import moment from "moment";
import { toast } from "sonner";

const ProductItemDetail = () => {

    const { isDarkMode } = ThemeContextAuth();
    const { id } = useParams();
    const business = jwtDecode(`${localStorage.getItem("token")}`);
    const businessId = business._id;
    const { allProduct, viewProductDetails, setViewProductDetails } = ContextAuth();
    const naviGate = useNavigate();

    const { _id } = useParams();

    const handleBack = () => {
        naviGate("/products");
      };

    useEffect(() => {
        try {
          axios(`https://khatabook-one.vercel.app/getproduct/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
    
              setViewProductDetails(res.data.response);
            })
            .catch((err) => {
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
      }, []);

    return(
        <>
        <LayoutMain>
        <Sidebar/>
        <Navigation/>
        <button
            onClick={handleBack}
            className="flex items-center justify-center w-12 h-12 rounded-full border mt-3 ml-3"
          >
            <BiArrowBack className="text-3xl"></BiArrowBack>
          </button>

          <div className="text-xl flex gap-y-2  justify-center items-center pt-4 flex-col overflow-y-auto">
            <div className="md:w-[30vw] w-full px-2">
              <label
                className="  text-sm flex  items-center font-bold mb-0.5 px-1"
                htmlFor="name"
              >
                Product Name
              </label>

              <input
                className="pl-2  flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2 bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="pName"
                type="text"
                name="name"
                value={viewProductDetails.ProductName}
                readOnly
              />
            </div>

            <div className="md:w-[30vw] w-full px-2">
              <label
                className="  text-sm flex  items-center font-bold mb-0.5 px-1"
                htmlFor="name"
              >
                Product Category
              </label>

              <input
                className="pl-2  flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2  bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="pCategory"
                type="text"
                name="name"
                value={viewProductDetails.ProductCategory}
                readOnly
              />
            </div>

            <div className="md:w-[30vw] w-full px-2">
              <label
                className="  text-sm flex  items-center font-bold mb-0.5 px-1"
                htmlFor="name"
              >
                Product Sub-Category
              </label>

              <input
                className="pl-2  flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2  bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="pCategory"
                type="text"
                name="name"
                value={viewProductDetails.ProductSubCategory}
                readOnly
              />
            </div>

            <div className="md:w-[30vw] w-full px-2">
              <label
                className="  text-sm flex  items-center font-bold mb-0.5 px-1"
                htmlFor="name"
              >
                Product Price
              </label>

              <input
                className="pl-2  flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2  bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="pCategory"
                type="text"
                name="name"
                value={viewProductDetails.ProductPrice}
                readOnly
              />
            </div>
          </div>

          

        </LayoutMain>
        </>
    );
};

export default ProductItemDetail;