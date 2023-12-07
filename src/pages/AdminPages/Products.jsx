import React, { useEffect, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { RiAddCircleFill } from "react-icons/ri";
import AddProductModal from "../../Modal/AddProductModal";
import { ContextAuth } from "../../context/Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import ProductDetail from "./ProductDetail";




const Products = () => {

    const [searchProduct, setsearchProduct] = useState("");
    const { isDarkMode } = ThemeContextAuth();
    const [modal, setModal] = useState({ show: false, data: {} });
    const { allProduct, setAllProduct } = ContextAuth();
    const [recentProduct, setrecentProduct] = useState(false);
    const [historyProduct, sethistoryProduct] = useState(false);
    const { setProductdata } = ContextAuth();
    const navigate = useNavigate();
    
    const [suggestedProducts, setSuggestedProducts] = useState([]);


    const handleRecentProductClick = () => {
      setrecentProduct(!recentProduct);
      sethistoryProduct(false);
    };

    const handleHistoryProductClick = () => {
      sethistoryProduct(!historyProduct);
      setrecentProduct(false);
    }

    useEffect(() => {
      handleRecentProductClick();
    }, []);

    useEffect(() => {
      try {
        axios("https://khatabook-one.vercel.app/getproduct", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            setAllProduct(res.data.response);
            
          })
          .catch((err) =>{
            alert(err?.message);
          });
      } catch (err) {
        alert(err?.message);
      }
    }, []);

    const handleSearch = (e) => {
      const inputValue = e.target.value;
        setsearchProduct(inputValue);

        const filteredProducts = allProduct.filter((product) =>
      product.ProductName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestedProducts(filteredProducts);
      };

      const handleSuggestedProductClick = (productName) => {
        // Set the selected product in the search bar and clear suggestions
        setsearchProduct(productName);
        setSuggestedProducts([]);

        const selectedProduct = allProduct.find(
          (product) => product.ProductName === productName
        );
        if (selectedProduct) {
          navigate(`/product-details/${selectedProduct._id}`);
        }

      };

return (
        <LayoutMain>
          {modal.show && (
          <AddProductModal
            data={modal.show && modal.data}
            setModal={setModal}
          />
        )}
            <Sidebar/>
            <Navigation/>

         <div className=" md:w-[70vw]  m-auto  flex  justify-center items-center pt-6">
          <input
            type="text"
            id="searchBar"
            onChange={handleSearch}
            value={searchProduct}
            placeholder="Search"
            // className=""
            className={` text-${
              isDarkMode ? "black" : "gray-800"
            } h-12 w-[90vw] flex justify-center items-center  rounded-lg border-2 border-black pl-2 focus:border-blue-500`}
          />

          {suggestedProducts.length > 0 && (
    <ul className="absolute mt-40 w-[90vw] bg-white shadow-md rounded-lg border border-gray-300">
      {suggestedProducts.map((product) => (
        <li
          key={product._id}
          onClick={() => handleSuggestedProductClick(product.ProductName)}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {product.ProductName}
        </li>
      ))}
    </ul>
  )}
        </div>

        <div className=" flex justify-center items-center h-[70vh] overflow-hidden ">

        <button
              onClick={() => {
                setModal({ show: true });
              }}
              className={`   text-6xl p-2   rounded-full   ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
          <RiAddCircleFill />
            </button>

        </div>

         

        </LayoutMain>

);
}

export default Products;