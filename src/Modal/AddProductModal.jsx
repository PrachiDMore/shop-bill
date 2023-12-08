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
import { IoClose } from "react-icons/io5";
import InputNew from "../components/InputNew";





const AddProductModal = ({ data, setModal, modal }) => {

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
    setproductName(modal?.data?.ProductName)
    setproductCategory(modal?.data?.ProductCategory)
    setproductSubCategory(modal?.data?.ProductSubCategory)
    setproductPrice(modal?.data?.ProductPrice)
    setShowModal(true);
  }, [modal]);

  const [productName, setproductName] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [productSubCategory, setproductSubCategory] = useState("");
  const [productPrice, setproductPrice] = useState("");

  const addProduct = async (e) => {
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
            ProductPrice: productPrice,
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
            }, 2000)

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

  return (
    <>
      <LayoutMain>
        <CSSTransition
          in={showModal}
          classNames="modal"
          timeout={300}
          unmountOnExit
        >
          <div className="h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center fixed top-0 left-0 shadow-lg z-[10000] ">

            <div
              className={
                "relative py-5 w-[90vw] md:w-[50vw]  bg-white rounded-lg "
              }
            >

              <div>
                <form
                  action=""
                  className={`text-black px-5 flex flex-col gap-y-4 justify-center  `}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xl">{!modal?.update ? "Add Product" : "Product Details"}</h4>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="font-bold text-2xl"
                    >
                      <IoClose />
                    </button>
                  </div>

                  <InputNew
                    type={"input"}
                    id={"pName"}
                    required={true}
                    label={"Product Name"}
                    placeholder={"Enter the Product Name"}
                    value={productName}
                    onChange={(e) => {
                      setproductName(e.target.value);
                    }}
                  />

                  <InputNew
                    type={"input"}
                    id={"pCategory"}
                    required={true}
                    label={"Product Category"}
                    placeholder={"Enter Category"}
                    value={productCategory}
                    onChange={(e) => {
                      setproductCategory(e.target.value);
                    }}
                  />

                  <InputNew
                    type={"input"}
                    id={"pSubCategory"}
                    required={true}
                    label={"Product SubCategory"}
                    placeholder={"Enter SubCategory"}
                    value={productSubCategory}
                    onChange={(e) => {
                      setproductSubCategory(e.target.value);
                    }}
                  />

                  <InputNew
                    type={"input"}
                    id={"pPrice"}
                    required={true}
                    label={"Product Price"}
                    placeholder={"Enter Product Price"}
                    value={productPrice}
                    onChange={(e) => {
                      setproductPrice(e.target.value);
                    }}
                  />

                  {!modal?.update ? <div className={"pt-3 w-full  flex justify-center items-center"}>
                    <button
                      onClick={addProduct}
                      type="button"
                      className="w-full py-3 px-4 bg-main text-white rounded-md text-center font-semibold"
                    >
                      {!loading ? (
                        <p className="flex items-center font-semibold text-center justify-center">
                          Next
                        </p>
                      ) : (
                        <div className="flex justify-center items-center">
                          <Spinner />
                        </div>
                      )}
                    </button>
                  </div> : <div className={"pt-3 w-full  flex justify-center items-center"}>
                    <button
                    type="button"
                      onClick={closeModal}
                      className="w-full py-3 px-4 bg-main text-white rounded-md text-center font-semibold"
                    >
                      {!loading ? (
                        <p className="flex items-center font-semibold text-center justify-center">
                          Next
                        </p>
                      ) : (
                        <div className="flex justify-center items-center">
                          <Spinner />
                        </div>
                      )}
                    </button>
                  </div>}
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