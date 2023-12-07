import "./ModalAnimation.css";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import LayoutMain from "../components/layout/LayoutMain";
import { ThemeContextAuth } from "../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/Spinner";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ContextAuth } from "../context/Context";
import { CSSTransition } from "react-transition-group";
import Input from "../components/Input/Input";
import { GrAdd, GrLinkNext, GrLinkPrevious } from "react-icons/gr";





const AddProductModal = ({ data, setModal }) => {

  const business = jwtDecode(`${localStorage.getItem("token")}`);
  const businessId = business._id;

  const { setProductdata } = ContextAuth();

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const closeModal = () => {
        setShowModal(false);
        setTimeout(() => {
          setModal({ show: false });
        }, 100); // Wait for the closing animation to complete (300ms)
      };
      useEffect(() => {
        setShowModal(true);
      }, [data]);

      const [productName, setproductName] = useState("");
      const [productCategory, setproductCategory] = useState("");
      const [productSubCategory, setproductSubCategory] = useState("");
      const [productPrice, setproductPrice] = useState("");

      const addProduct = async(e) => {
          e.preventDefault();

          try {
            if (productName.length > 1 && productPrice > 0) {
              setLoading(true);
              await axios("https://khatabook-one.vercel.app/addproduct", {
                method: "POST",
                data: {
                  ProductName: productName,
                  ProductCategory: productCategory,
                  ProductSubCategory: productSubCategory,
                  ProductPrice:productPrice,
                  businessId: businessId,
                },
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((res) => {
                  const productId = res.data._id;
                  setProductdata(productId);
                   toast.success("Product Added Successfully", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: false,
                    theme: "light",
                  });
                  setLoading(false);
                  setTimeout(() => {
                    window.location.reload();
                  },2000)
                 
                  // console.log(res.data.token);
                  
                })
                .catch((err) => {
                  console.log(err);
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
                  setLoading(false);
                });
            } else {
              toast.error("Enter Details Correctly", {
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

    return(
        <>
        <LayoutMain>
        <CSSTransition
          in={showModal}
          classNames="modal"
          timeout={300}
          unmountOnExit
        >
        <div className="h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center fixed top-0 left-0 shadow-lg z-[100] ">

        <div
              className={
                "productForm" //relative h-[60vh] w-[90vw] md:w-[50vw]  bg-white rounded-lg
              }
            >

                <div>
                <form
                  action=""
                  className={`text-black pt-8 px-5 flex flex-col gap-y-6 justify-center h-full `}
                >
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 font-bold text-2xl text-red-600"
                  >
                    <AiOutlineClose />
                  </button>

                  <Input
                    type={"input"}
                    id={"pName"}
                    required={true}
                    Label={"Product Name"}
                    placeholder={"Enter the Product Name"}
                    value={productName}
                    onChange={(e) => {
                      setproductName(e.target.value);
                    }}
                    className={`w-[95%]  
                  text-black `}
                  />

                  <Input
                    type={"input"}
                    id={"pCategory"}
                    required={true}
                    Label={"Product Category"}
                    placeholder={"Enter Category"}
                    value={productCategory}
                    onChange={(e) => {
                      setproductCategory(e.target.value);
                    }}
                    className={`w-[95%]  
                  text-black `}
                  />

                  <Input
                    type={"input"}
                    id={"pSubCategory"}
                    required={true}
                    Label={"Product SubCategory"}
                    placeholder={"Enter SubCategory"}
                    value={productSubCategory}
                    onChange={(e) => {
                      setproductSubCategory(e.target.value);
                    }}
                    className={`w-[95%]  
                  text-black `}
                  />

                  <Input
                    type={"input"}
                    id={"pPrice"}
                    required={true}
                    Label={"Product Price"}
                    placeholder={"Enter Product Price"}
                    value={productPrice}
                    onChange={(e) => {
                      setproductPrice(e.target.value);
                    }}
                    className={`w-[95%]  
                  text-black `}
                  />

                  <button
                      onClick={addProduct}
                      className="flex justify-center items-center gap-x-2 bg-blue-600 px-3 py-1.5 rounded-md font-semibold hover:bg-blue-700 shadow hover:shadow-lg duration-150"
                    >
                      {!loading ? (
                        <p className="flex items-center gap-x-1">
                          {" "}
                          Next <GrLinkNext />
                        </p>
                      ) : (
                        <Spinner />
                      )}
                    </button>
                </form>
            </div>
        </div>
    
        </div>


        </CSSTransition>
        <ToastContainer />
        </LayoutMain>
        </>
    );
}

export default AddProductModal;