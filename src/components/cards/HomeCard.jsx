import React, { useState } from "react";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
function formatDate(dateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options);
}
const CustomerCard = ({
  name,
  date,
  mobileNumber,
  amount,
  items,
  div,
  ref,
  id,
  time,
  discount,
  paid,
  unPaid,
  onClick,
  billId,
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = ThemeContextAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorChange, setcolorChange] = useState(false);
  const [showPaid, setShowPaid] = useState(true);
  console.log(billId);

  const handleColorChange = () => {
    setcolorChange(!colorChange);
  };
  const handleCardClick = () => {
    // setIsModalOpen(true);
    navigate(`/customer-details/${id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const formattedDate = formatDate(date);

  return (
    <>
      <div
        className={`dark:bg-white/10 bg-white dark:text-white text-gray-800 p-4 rounded-lg  shadow-md  transform  perspective-100  hover:shadow-lg  overflow-hidden border`}
      >
        <div className="flex justify-between items-center gap-x-2 ">
          <p className="font-medium ">Total: Rs {amount - discount}</p>
          {/* <p className="font-medium ">Bill Id: {billId.slice(0, 10)}</p> */}
        </div>
        <div className=" py-2 flex justify-between items-start  ">
          <div className="w-6/12" onClick={handleCardClick} ref={ref}>
            <p className="flex flex-col   gap-y-1 md:flex-none justify-start">
              <div className="font-bold text-left ">{name}</div>

              <p className="text-sm font-medium  ">{mobileNumber}</p>
            </p>
          </div>

          <div className="flex flex-col gap-y-3 justify-center items-end w-6/12">
            {
              showPaid ? (
                <button
                  // className="text-3xl text-center mb-2 font-bold text-green-500"
                  className={`text-center flex gap-x-1 items-center text-xl  `}
                  onClick={() => {
                    setShowPaid(false);
                  }}
                >
                  {/* <p className="text-sm ">Paid:</p> */}
                  <p className="font-bold  text-green-500">&#8377;{paid}</p>
                </button>
              ) : (
                <button
                  className={"text-center flex gap-x-1 items-center text-xl "}
                  onClick={() => {
                    setShowPaid(true);
                  }}
                >
                  {/* <p className="text-sm ">UnPaid: </p> */}
                  <p className="font-bold text-red-500">
                    &#8377;{amount - discount - paid}
                  </p>
                </button>
              )
            }

          </div>
        </div>

        <div
          className="w-12/12 bg-main flex justify-center items-center rounded-md gap-4 cursor-pointer"
          onClick={() => {
            onClick(billId);
          }}
        >
          <button className=" text-white font-bold  p-[9px] rounded-full  flex gap-2 justify-center items-center">
            <BsWhatsapp className=" text-xl text-center "></BsWhatsapp>
            <p className="text-white font-semibold">Send Bill</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerCard;
