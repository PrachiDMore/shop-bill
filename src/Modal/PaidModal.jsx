import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ThemeContextAuth } from "../context/ThemeContext";
import { ContextAuth } from "../context/Context";
import axios from "axios";
import Spinner from '../components/Spinner'
import InputNew from "../components/InputNew";
const PaidModal = ({ setPaidModal, data, billData }) => {
  const { paid, setPaid, savePaid } = ContextAuth();
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = ThemeContextAuth();
  const naviGate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setPaid(() => ({
      [e.target.id]: e.target.value,
    }));
  };

  const PaidAmount = async (id) => {
    try {
      setLoading(true)
      await axios(`https://khatabook-one.vercel.app/updatebill/${id}`, {
        method: "PATCH",
        data: {
          paid: billData?.paid + paid,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        toast.success(res?.data?.messaage);
        if (!res.data.error) {
          window.location.reload();
        }
        setLoading(false)
      });
    } catch (error) {
      setLoading(false)
    }
  };
  return (
    <>
      <div className="h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center fixed top-0 left-0 shadow-lg z-[50000] ">
        <div
          className={
            "relative w-[80vw] md:w-[30vw] dark:bg-white/10 bg-white rounded-lg p-5"
          }
        >
          <div className="flex justify-center items-center flex-col h-full gap-y-5 w-full">
            <InputNew
              type="number"
              id="paid"
              label={"Paid Amount"}
              value={paid}
              onChange={(e) => {
                let finalAmount = billData?.grandtotal - billData?.discount;
                let paidValue = Number(e.target.value) + billData?.paid;
                if (finalAmount >= paidValue) {
                  setPaid(Number(e.target.value));
                }
              }}
            />
            <div className="flex justify-between items-center gap-x-5 w-full">
              <button
                className="font-bold bg-red-600 text-white py-2 px-2 rounded-md w-1/2 flex justify-center items-center"
                onClick={() => setPaidModal({ show: false })}
              >
                {'Close'}
              </button>
              <button
                className="font-bold bg-main text-white py-2 px-2 rounded-md w-1/2 flex justify-center items-center"
                onClick={() => PaidAmount(data)}
              >
                {!loading ? 'Paid' : <Spinner />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaidModal;
