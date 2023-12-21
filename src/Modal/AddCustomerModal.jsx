import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Input from "../components/Input/Input";
import { GrAdd, GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import "./ModalAnimation.css";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextAuth } from "../context/Context";
import jwtDecode from "jwt-decode";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContextAuth } from "../context/ThemeContext";
import LayoutMain from "../components/layout/LayoutMain";
import InputNew from "../components/InputNew";

const AddCustomerModal = ({ data, setModal }) => {
  const [showModal, setShowModal] = useState(false);
  const { setCustomerdata } = ContextAuth();
  const { isDarkMode } = ThemeContextAuth();
  // const { business } = ContextAuth();
  const [loading, setLoading] = useState(false);

  const business = jwtDecode(`${localStorage.getItem("token")}`);
  const businessId = business._id;

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModal({ show: false });
    }, 100); // Wait for the closing animation to complete (300ms)
  };
  useEffect(() => {
    setShowModal(true);
  }, [data]);

  const [customerNumber, setcustomerNumber] = useState("");
  const [customerName, setcustomerName] = useState("");
  const navigate = useNavigate();

  const createCustomer = async (e) => {
    e.preventDefault();
    try {
      if (customerName.length > 1 && customerNumber.length == 10) {
        setLoading(true);
        await axios("https://khatabook-one.vercel.app/addcustomer", {
          method: "POST",
          data: {
            customerNumber: customerNumber,
            customerName: customerName,
            businessId: businessId,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            const customerId = res.data.customer._id;
            setCustomerdata(customerId);

            navigate("/add-bills");
            // console.log(res.data.token);
            setLoading(false);
          })
          .catch((res) => {
            toast.error("Customer already exist", {
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
        toast.error("Enter 10 digit number", {
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
                "relative py-5 w-[90vw] md:w-[50vw]  bg-white dark:bg-white/10 rounded-lg "
              }
            >
              <div>
                <form
                  action=""
                  className={`dark:text-white text-black px-5 flex flex-col gap-y-4 justify-center h-full `}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xl">Add Customer</h4>
                    <button
                      onClick={closeModal}
                      className="font-bold text-2xl"
                    >
                      <IoClose />
                    </button>
                  </div>

                  <InputNew
                    type={"input"}
                    id={"name"}
                    required={true}
                    label={"Customer Name"}
                    placeholder={"Enter the Customer Name"}
                    value={customerName}
                    onChange={(e) => {
                      setcustomerName(e.target.value);
                    }}
                  />

                  <InputNew
                    type={"number"}
                    id={"number"}
                    label={"Customer Number"}
                    placeholder={"Enter the Customer Number"}
                    value={customerNumber}
                    onChange={(e) => {
                      setcustomerNumber(e.target.value);
                    }}
                    maxLength={"10"}
                  />
                  <div className="pt-3 w-full  flex justify-center items-center">
                    <button
                      onClick={createCustomer}
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CSSTransition>
        <ToastContainer />
      </LayoutMain>
    </>
  );
};

export default AddCustomerModal;
