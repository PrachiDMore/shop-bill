import React, { useEffect, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddCustomerModal from "../../Modal/AddCustomerModal";
import { ThemeContextAuth } from "../../context/ThemeContext";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import CustomerCard from "../../components/cards/HomeCard";
import { Link, useNavigate } from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar";
import LayoutNew from "../../components/layout/LayoutNew";
import InputNew from "../../components/InputNew";

const Customers = () => {
  const [modal, setModal] = useState({ show: false, data: {} });
  const { isDarkMode } = ThemeContextAuth();
  const [recentCustomer, setrecentCustomer] = useState(false);
  const [historyCustomer, sethistoryCustomer] = useState(false);
  const { allCustomer, setAllCustomer } = ContextAuth();
  const [searchCustomer, setsearchCustomer] = useState("");
  const navigate = useNavigate();
  const { setCustomerdata } = ContextAuth();

  const filterCustomer = allCustomer?.filter(
    (allCustomer) =>
      allCustomer.customerName
        .toLowerCase()
        .includes(searchCustomer.toLowerCase()) ||
      allCustomer.customerNumber.includes(searchCustomer)
  );

  const handleRecentCustomerClick = () => {
    setrecentCustomer(!recentCustomer);
    sethistoryCustomer(false);
  };

  const handleHistoryCustomerClick = () => {
    sethistoryCustomer(!historyCustomer);
    setrecentCustomer(false);
  };
  useEffect(() => {
    handleRecentCustomerClick();
  }, []);

  useEffect(() => {
    try {
      axios("https://khatabook-one.vercel.app/getcustomer", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setAllCustomer(res?.data?.response);
        })
        .catch((err) => {
          alert(err?.message);
        });
    } catch (err) {
      alert(err?.message);
    }
  }, []);

  const handleCardClick = (_id) => {
    setCustomerdata(_id);
    navigate("/add-bills");
  };

  const handleSearch = (e) => {
    setsearchCustomer(e.target.value);
  };
  return (
    <>

      <LayoutNew>
        <button onClick={() => {
          setModal({ show: true })
        }} className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-main text-white text-4xl font-medium h-12 w-12 rounded-full z-[100000]">+</button>
        {
          modal.show && <AddCustomerModal
            data={modal.show && modal.data}
            setModal={setModal}
          />
        }
        <Sidebar title={"Customers"} />
        <div className="px-5 w-screen min-h-screen pt-20 relative z-50">
          <InputNew onChange={handleSearch} className="bg-white" placeholder={"Search..."} icon={"/assets/search.svg"} />
          <div className="h-[70vh] relative z-50 flex flex-col gap-y-4 mt-6 overflow-scroll">
            {filterCustomer?.map((customer, index) => (
              <div
                key={index}
                className={`dark:bg-white/10 bg-white  px-4 py-3 rounded-lg shadow-md border`}
              >
                <div className="gap-y-3 flex flex-col justify-center items-center w-[100%] ">
                  <div className="flex flex-col gap-x-6 w-[100%]">
                    <h3 className="font-bold">
                      {customer?.customerName}
                    </h3>
                    <p className=" font-semibold text-sm">
                      {customer?.customerNumber}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 w-[100%]">
                    <button
                      onClick={() => {
                        handleCardClick(customer?._id);
                      }}
                      className=" py-2 px-4 bg-main text-white rounded-md text-center font-semibold"
                    >
                      Generate Bill
                    </button>
                    <Link
                      to={`/customer-details/${customer?._id}`}
                      className=" py-2 px-4  bg-main text-white rounded-md text-center font-semibold "
                    >
                      View Bills
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutNew>
    </>
  );
};

export default Customers;
