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
import LayoutNew from "../../components/layout/LayoutNew";
import InputNew from "../../components/InputNew";




const ProductsList = () => {

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
          setSuggestedProducts(res.data.response);
        })
        .catch((err) => {
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
    <>
      <LayoutNew nav={true}>
        <button onClick={() => {
          setModal({ show: true })
        }} className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-main text-white text-4xl font-medium h-12 w-12 rounded-full z-[100000]">+</button>

        {modal.show && (
          <AddProductModal
            data={modal.show && modal.data}
            setModal={setModal}
            modal={modal}
          />
        )}

        <Sidebar title={"Products"} />
        <div className="px-5 w-screen min-h-screen pt-20 relative z-50">
          <InputNew type="text"
            id="searchBar"
            onChange={handleSearch}
            value={searchProduct}
            placeholder="Search" className={"bg-white"} />
          <div className="h-[70vh] mt-4 flex flex-col gap-y-4">
            {
              suggestedProducts?.map((product) => {
                return <div onClick={() => {
                  setModal({show: true, update: true, data: product})
                }} className="px-5 py-3 rounded-lg dark:bg-white/10 bg-white shadow-md">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xl">{product?.ProductName}</h4>
                    <p className="text-xl font-bold">₹{product?.ProductPrice}</p>
                  </div>
                  <div className="font-medium">
                    <p>Category: {product?.ProductCategory}</p>
                    <p>Sub-category: {product?.ProductSubCategory}</p>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </LayoutNew>
    </>
  );
}

export default ProductsList;