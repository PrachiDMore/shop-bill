import React, { useEffect, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import {
  format,

} from "date-fns";
import noItems from "../../images/noItems.svg";
import { ThemeContextAuth } from "../../context/ThemeContext";

import { IoCheckmarkDoneCircle } from "react-icons/io5";
import "./ShowCustomerDetail.css";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { BiArrowBack } from "react-icons/bi";
import Navigation from "../../components/Navigation";
import PageLoader from "../../components/PageLoader";
import moment from "moment";
import PaidModal from "../../Modal/PaidModal";
import { ToastContainer, toast } from "react-toastify";
import LayoutNew from "../../components/layout/LayoutNew";
import InputNew from "../../components/InputNew";


const ShowCustomerBills = () => {
  const { isDarkMode } = ThemeContextAuth();
  const { id } = useParams();
  const business = jwtDecode(`${localStorage.getItem("token")}`);
  const businessId = business._id;
  const [selected, setSelected] = useState(null);
  const [viewCustomerBills, setViewCustomerBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paidModal, setPaidModal] = useState({ show: false, data: {} });

  const { allCustomer, viewCustomerDetails, setViewCustomerDetails } =
    ContextAuth();
  const [modal, setModal] = useState({ show: false, data: {} });
  const [filterResults, setFilterResults] = useState([]);
  const naviGate = useNavigate();
  useEffect(() => {
    setLoading(true);
    try {
      const data = {
        customerId: id,
        businessId: businessId,
      };

      axios(`https://khatabook-one.vercel.app/getcustomerbill`, {
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setViewCustomerBills(res?.data?.response);
          setLoading(false);
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

  useEffect(() => {
    try {
      axios(`https://khatabook-one.vercel.app/getcustomer/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {

          setViewCustomerDetails(res?.data?.response);
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

  const toggle = (e) => {
    if (selected === e) {
      return setSelected(null);
    }

    setSelected(e);
  };

  useEffect(() => {
    setFilterResults(viewCustomerBills);
  }, [viewCustomerBills]);

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilterChange = (event) => {
    setSelectedDate("");
    setFilter(event.target.value);
    const finalData = viewCustomerBills?.map((bill) => {
      const filterDate = moment(bill?.createdAt).format("YYYY-MM-DD");
      return {
        ...bill,
        filterDate: filterDate,
        filterDateMilliseconds: moment(bill?.createdAt).format("X"),
      };
    });
    if (event.target.value === "all") {
      setFilterResults(viewCustomerBills);
    } else if (event.target.value === "today") {
      const today = moment().format("YYYY-MM-DD");
      setFilterResults(
        finalData?.filter((bill) => {
          return bill?.filterDate === today;
        })
      );
    } else if (event.target.value === "yesterday") {
      const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
      setFilterResults(
        finalData?.filter((bill) => {
          return bill?.filterDate === yesterday;
        })
      );
    } else if (event.target.value === "lastWeek") {
      const lastWeek = moment().subtract(1, "week").format("X");
      const today = moment().format("X");
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            lastWeek <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < today
          );
        })
      );
    } else if (event.target.value === "lastMonth") {
      const lastMonth = moment().subtract(1, "months").format("X");
      const today = moment().format("X");
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            lastMonth <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < today
          );
        })
      );
    } else if (event.target.value === "lastYear") {
      const lastYear = moment().subtract(1, "years").format("X");
      const today = moment().format("X");
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            lastYear <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < today
          );
        })
      );
    } else {
      setFilterResults(viewCustomerBills);
    }
  };
  const handleBack = () => {
    naviGate("/get-bill");
  };

  useEffect(() => {
    if (selectedDate?.length !== 0) {
      setFilter("all");
      let finalData = viewCustomerBills?.map((bills) => {
        let finalDate = moment(bills?.createdAt).format("YYYY-MM-DD");
        return {
          ...bills,
          filterDate: finalDate,
        };
      });
      const filteredResults = finalData?.filter((data) => {
        return data?.filterDate === selectedDate;
      });
      setFilterResults(filteredResults);
    } else {
      setFilterResults(viewCustomerBills);
    }
  }, [selectedDate]);

  const handleSingleBill = (_id) => {
    naviGate(`/invoice/${_id}`);
  };

  return (
    <>
      <LayoutNew nav={true}>
        <Sidebar title={"View Bills"} back={handleBack} />
        <div className="w-screen pt-14 relative z-50 h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-1 px-5 gap-1 text-center">
            <h3 className="text-xl font-bold">{viewCustomerDetails?.customerName}</h3>
            <p className="text-sm">{viewCustomerDetails?.customerNumber}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-3 px-5 mt-5">
            <select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="flex w-full gap-4 items-center px-4 py-3 rounded-lg shadow-md dark:bg-white/10 bg-white "
            >
              <option
                className={`  ${isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
                  }`}
                value="all"
              >
                All
              </option>
              <option
                className={`  ${isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
                  }`}
                value="today"
              >
                Today
              </option>
              <option
                className={`  ${isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
                  }`}
                value="yesterday"
              >
                Yesterday
              </option>
              <option
                className={`  ${isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
                  }`}
                value="lastWeek"
              >
                Last Week
              </option>
              <option
                className={`  ${isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
                  }`}
                value="lastMonth"
              >
                Last Month
              </option>
              <option
                className={`  ${isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
                  }`}
                value="lastYear"
              >
                Last Year
              </option>
            </select>

            <InputNew
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              className="bg-white"
            />
          </div>


          <div className="">
            {paidModal.show && (
              <PaidModal
                billData={paidModal?.billData}
                data={paidModal.show && paidModal.data}
                setPaidModal={setPaidModal}
              />
            )}
            {!loading ? (
              <div className="mt-4">
                {filterResults?.length > 0 ? (
                  <div className="px-5 grid grid-cols-1 gap-3">
                    {filterResults?.map((value, index) => {
                      return (
                        <div
                          key={index}
                          className="text-sm font-semibold flex justify-center "
                        >
                          <div
                            className={`flex    duration-200 justify-center items-center py-3 px-2 gap-x-2  shadow-sm shadow-blue-200 outline-none  border border-gray-300 bg-transparenthover:shadow-blue-200 rounded-md w-full cursor-pointer   ${isDarkMode
                              ? "hover:border-white"
                              : "hover:border-black"
                              }`}
                          >
                            <p
                              onClick={() => {
                                handleSingleBill(value?._id);
                              }}
                              className="flex items-center gap-x-2 w-5/12"
                            >
                              <p>
                                {format(
                                  new Date(value?.createdAt),
                                  "dd/MMM/yyyy"
                                )}
                              </p>
                            </p>
                            <div className="w-2/12 flex justify-center items-center">
                              {value?.grandtotal - value?.discount ===
                                value?.paid ? (
                                <div>
                                  <p>
                                    <IoCheckmarkDoneCircle className="text-green-500 text-xl"/>
                                  </p>
                                </div>
                              ) : (
                                <p
                                  onClick={() => {
                                    setPaidModal({
                                      show: true,
                                      // data: value?.customerId?._id,
                                      data: value?._id,
                                      billData: value,
                                    });
                                  }}
                                  className="text-red-500 hover:text-base hover:font-bold"
                                >
                                  &#8377;{" "}
                                  {value?.grandtotal -
                                    value?.paid -
                                    value?.discount}
                                </p>
                              )}
                            </div>
                            <p
                              className="w-5/12 flex justify-end items-center"
                              onClick={() => {
                                handleSingleBill(value?._id);
                              }}
                            >
                              Total: &#8377;
                              {value?.grandtotal - value?.discount}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className=" mt-12   px-8  ">
                    <div className="flex justify-around flex-col md:justify-center items-center md:flex-row">
                      <div className="w-[40%] md:w-[20%] ">
                        <img src={noItems} alt="" />
                      </div>

                      <div
                        className={`flex flex-col justify-center items-center   text-${isDarkMode ? "black" : "gray-800"
                          } p-4`}
                      >
                        <span className="font-mono    text-xl">
                          Oop's! No Data Available.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <PageLoader className={"h-[40vh]"} />
            )}
          </div>
        </div>
      </LayoutNew>

    </>
  );
};

export default ShowCustomerBills;
