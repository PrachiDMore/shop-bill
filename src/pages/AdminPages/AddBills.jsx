import React, { useEffect, useRef, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import noItems from "../../images/noItems.svg";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { AiFillDelete, AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { ContextAuth } from "../../context/Context";
import Spinner from "../../components/Spinner";
import Navigation from "../../components/Navigation";
import { toast, ToastContainer } from "react-toastify";
import LayoutNew from "../../components/layout/LayoutNew";
import InputNew from "../../components/InputNew";

const AddBills = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [individualPrice, setIndividualPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("piece");
  const [isTotalEditable, setIsTotalEditable] = useState(false);
  const [pending, setPending] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const { isDarkMode } = ThemeContextAuth();
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { customerData, paid, setPaid, setUnPaid, setsavePaid } = ContextAuth();
  const [editIndex, setEditIndex] = useState(null);

  const [recentProduct, setrecentProduct] = useState(false);
  const [historyProduct, sethistoryProduct] = useState(false);
  const { allProduct, setAllProduct } = ContextAuth();
  const [searchProduct, setsearchProduct] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [enteredItem, setEnteredItem] = useState("");

  const business = jwtDecode(`${localStorage.getItem("token")}`);
  const businessId = business._id;

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



  const handleEnteredItemChange = (e) => {
    setEnteredItem(e.target.value);
  };

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
    setItem(productName);
    setEnteredItem(productName);
    setSuggestedProducts([]);

    const selectedProduct = allProduct.find(
      (product) => product.ProductName === productName
    );

    if (selectedProduct) {
      setIndividualPrice(selectedProduct.ProductPrice);
    }
  };

  useEffect(() => {
    if (items) {
      let itemtotal = 0;

      items.map((obj) => {
        itemtotal += obj.total;
      });

      setGrandtotal(itemtotal);
    }
  }, [items]);

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
    calculateTotal(e.target.value, individualPrice);
  };

  const handlePriceChange = (e) => {
    setIndividualPrice(e.target.value);
    calculateTotal(qty, e.target.value);
  };

  const calculateTotal = (qty, individualPrice) => {
    let total = 0;
    if (selectedUnit === "piece") {
      total = qty * individualPrice;
    }
    setTotal(total);
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
    calculateTotal(qty, individualPrice);
  };
  const addItem = () => {
    if (item.length >= 1 && qty > 0 && individualPrice > 0) {
      let obj = {
        item: item,
        qty: qty,
        selectedUnit: selectedUnit,
        individualPrice: individualPrice,
        total: Number(total),
        unit: selectedUnit,
        cost: Number(individualPrice),
        grandTotal: Number(grandtotal),
      };
      let finalItems = [...items];
      finalItems.push(obj);
      setItems(finalItems);
      setsearchProduct("");
      setItem("");
      setQty(0);
      setTotal(0);
      setIndividualPrice(0);

      setGrandtotal(0);
    }
  };

  const handleTotalEdit = () => {
    setIsTotalEditable(true);
  };

  const handleTotalSave = (e) => {
    if (e.key === "Enter") {
      setIsTotalEditable(false);
    }
  };
  const navigate = useNavigate();

  const cancel = () => {
    navigate("/add-customer");
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setItem(items[index].item);
    setQty(items[index].qty);
    setIndividualPrice(items[index].individualPrice);
    setTotal(items[index].total);
  };

  const handleSaveClick = (index) => {
    const updatedItem = {
      item: item,
      qty: qty,
      selectedUnit: selectedUnit,
      individualPrice: Number(individualPrice),
      total: Number(total),
    };
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
    setEditIndex(null);
    setItem("");
    setQty("");
    setSelectedUnit("piece");
    setIndividualPrice(0);
    setTotal(0);
  };

  const handleSplice = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const getBill = async () => {
    if (items.length > 0) {
      setLoading(true);

      try {
        await axios("https://khatabook-one.vercel.app/generatebill", {
          method: "POST",
          data: {
            customerId: customerData,
            businessId: businessId,
            items: items,

            grandtotal: grandtotal,
            discount: Number(discount),
            paid: Number(paid),
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            console.log(res);
            navigate("/get-single-bill");
            setLoading(false);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please add some Data", {
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

  useEffect(() => {
    setUnPaid(grandtotal - discount - paid);
  }, [paid, discount, grandtotal]);

  return (
    <>
      <LayoutNew nav={true}>
        <Sidebar title={"Add Bills"} />
        <div className="px-5 w-screen pt-20 relative z-50 h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <InputNew value={searchProduct} onChange={handleSearch} placeholder={"Enter Items"} className={"bg-white px-2"} />
              {suggestedProducts.length > 0 && (
                <ul className="absolute mt-0 w-full dark:bg-black/90 bg-white shadow-md rounded-lg border border-gray-300">
                  {suggestedProducts.map((product) => (
                    <li
                      key={product._id}
                      onClick={() => handleSuggestedProductClick(product.ProductName)}
                      className="px-4 py-2 cursor-pointer dark:bg-white/10"
                    >
                      {product.ProductName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quantity */}
            <div className={'flex w-full items-center py-3 rounded-lg shadow-md dark:bg-white/10 bg-white px-2 '} >
              <input value={qty} onChange={handleQtyChange} className='placeholder:text-sm outline-none bg-transparent px-2 w-full' type={"number"} placeholder={"Enter Quantity"} />
              <select value={selectedUnit} onChange={handleUnitChange} className="w-6/12 text-sm bg-transparent outline-none dark:text-white">
                <option value="piece">Piece</option>
                <option value="kg">Kg</option>
                <option value="gm">Gm</option>
              </select>
            </div>

            <InputNew type="number" value={individualPrice} onChange={handlePriceChange} className={"bg-white px-2"} />

            {/* Total */}
            <div className={'flex w-full items-center py-3 rounded-lg shadow-md dark:bg-white/10 bg-white px-2 '} >
              <input onKeyDown={handleTotalSave} className='placeholder:text-sm outline-none bg-transparent px-2' type={"number"} onChange={(e) => setTotal(e.target.value)} id={"total"} value={total} placeholder={"Total"} />
            </div>

          </div>
          <button onClick={addItem} className="mt-4 py-3 px-4 bg-[#01AAE0] w-full text-white rounded-md text-center font-semibold" >Add</button>

          <div className="mt-5 overflow-x-auto">
            {
              items.length > 0 &&
              <>
                <table
                  className={`min-w-full divide-y divide-gray-200 border-2 border-b-black p-2  border-collapse rounded-lg ${isDarkMode ? "border-white" : "border-black"
                    }`}
                >
                  <thead>
                    <tr
                      className={`border-2 py-2  text-cente ${isDarkMode ? "border-white" : "border-black"
                        }`}
                    >
                      <th
                        className={`sticky left-0 w-fit  py-2 px-4  ${isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white  text-black"
                          }`}
                      >
                        Item
                      </th>
                      <th
                        className={` py-2 px-4    ${isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white  text-black"
                          }`}
                      >
                        Quantity
                      </th>
                      <th
                        className={` py-2 px-4    ${isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white  text-black"
                          }`}
                      >
                        Unit
                      </th>
                      <th
                        className={` py-2 px-4   ${isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white  text-black"
                          }`}
                      >
                        Individual
                      </th>
                      <th
                        className={`  py-2 px-4   ${isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white  text-black"
                          }`}
                      >
                        Total
                      </th>
                      <th
                        className={` py-2 px-4   ${isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white  text-black"
                          }`}
                      >
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" divide-y divide-gray-200">
                    {items?.map((value, index) => {
                      return (
                        <tr
                          key={index}
                          className={`border-b-2  text-x text-center   ${isDarkMode
                            ? "bg-gray-800 text-white"
                            : "bg-white  text-black border-black"
                            }`}
                        >
                          <td
                            className={`sticky left-0 md:w-2/6 w-32  px-2 border whitespace-nowrap ${isDarkMode
                              ? "bg-gray-800 border-white"
                              : "bg-white border-black "
                              }`}
                          >
                            {index === editIndex ? (
                              <input
                                type="text"
                                value={item}
                                className={`border  text-center md:w-56 w-28  bg-transparent border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                                  ? "bg-gray-800 text-white border-white"
                                  : "bg-white  text-gray-800 border-black"
                                  }`}
                                onChange={(e) => {
                                  setItem(e.target.value);
                                }}
                              />
                            ) : (
                              value.item
                            )}
                          </td>
                          <td
                            className={`px-2 border md:w-40 w-28  whitespace-nowrap ${isDarkMode
                              ? "bg-gray-800 border-white"
                              : "bg-white border-black "
                              }`}
                          >
                            {index === editIndex ? (
                              <input
                                className={`border  text-center md:w-32 w-24 bg-transparent border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                                  ? "bg-gray-800 text-white border-white"
                                  : "bg-white  text-gray-800 border-black"
                                  }`}
                                type="text"
                                value={qty}
                                onChange={(e) => {
                                  setQty(e.target.value);
                                }}
                              />
                            ) : (
                              value?.qty
                            )}
                          </td>
                          <td
                            className={`px-2 border md:w-40 w-28  whitespace-nowrap ${isDarkMode
                              ? "bg-gray-800 border-white"
                              : "bg-white border-black "
                              }`}
                          >
                            {index === editIndex ? (
                              <input
                                className={`border  text-center md:w-32 w-24 bg-transparent border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                                  ? "bg-gray-800 text-white border-white"
                                  : "bg-white  text-gray-800 border-black"
                                  }`}
                                type="text"
                                value={selectedUnit}
                                onChange={(e) => {
                                  setSelectedUnit(e.target.value);
                                }}
                              />
                            ) : (
                              value?.selectedUnit
                            )}
                          </td>

                          <td
                            className={` px-2 border md:w-40 w-28  whitespace-nowrap ${isDarkMode
                              ? "bg-gray-800 border-white"
                              : "bg-white border-black "
                              }`}
                          >
                            &#8377;
                            {index === editIndex ? (
                              <input
                                type="number"
                                className={`border  text-center md:w-32 w-24  border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                                  ? "bg-gray-800 text-white border-white"
                                  : "bg-white  text-gray-800 border-black"
                                  }`}
                                value={individualPrice}
                                onChange={(e) => {
                                  setIndividualPrice(e.target.value);
                                }}
                              />
                            ) : (
                              value?.individualPrice
                            )}
                          </td>
                          <td
                            className={` px-2  border md:w-40 w-28  whitespace-nowrap ${isDarkMode
                              ? "bg-gray-800 border-white "
                              : "bg-white border-black "
                              }`}
                          >
                            &#8377;
                            {index === editIndex ? (
                              <input
                                type="number"
                                className={`border  text-center md:w-32 w-24  border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500  ${isDarkMode
                                  ? "bg-gray-800 text-white border-white"
                                  : "bg-white  text-gray-800 border-black"
                                  }`}
                                value={total}
                                onChange={(e) => {
                                  setTotal(e.target.value);
                                }}
                              />
                            ) : (
                              value?.total
                            )}
                          </td>

                          <td className="border px-8  py-2 flex justify-around  items-center gap-x-4">
                            <div>
                              {index === editIndex ? (
                                <button
                                  onClick={() => handleSaveClick(index)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded "
                                >
                                  <AiOutlineSave />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleEditClick(index)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded "
                                >
                                  <AiOutlineEdit />
                                </button>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                handleSplice(index);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded whitespace-nowrap"
                            >
                              <AiFillDelete></AiFillDelete>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className=" w-full flex justify-center sticky left-0  pt-4 gap-x-3 px-1">
                  <div
                    className={`flex items-center jc border-2 text-base py-1 gap-x-1 w-fit pl-2 ${isDarkMode ? "border-white" : "border-black"
                      }`}
                  >
                    <p className="flex items-center  text-base">
                      Discount: &#8377;{" "}
                    </p>
                    <input
                      value={discount}
                      onChange={(e) => {
                        if (e.target.value <= grandtotal) {
                          setDiscount(e.target.value);
                        }
                      }}
                      className={`  w-[30%]   flex items-center  border-none outline-none bg-transparent ${isDarkMode ? "bg-gray-800 " : "bg-white "
                        }`}
                      required="true"
                    />
                  </div>
                  <p
                    className={`border-2 py-1 px-3 text-base flex items-center w-[80%] ${isDarkMode ? "border-white" : "border-black"
                      }`}
                  >
                    GrandTotal: &#8377;
                    {discount ? grandtotal - discount : grandtotal} /-
                  </p>
                </div>

                <div className=" w-full flex justify-center  pt-4 gap-x-3  sticky left-0 px-1">
                  <div
                    className={`flex items-center jc border-2 text-base py-1 gap-x-1 w-fit pl-2 ${isDarkMode ? "border-white" : "border-black"
                      }`}
                  >
                    <p className="flex items-center  text-base">
                      Paid: &#8377;
                    </p>
                    <input
                      value={paid}
                      onChange={(e) => {
                        if (e.target.value <= grandtotal - discount) {
                          setPaid(e.target.value);
                        }
                      }}
                      className={`  w-[30%]   flex items-center  border-none outline-none bg-transparent ${isDarkMode ? "bg-gray-800 " : "bg-white "
                        }`}
                      required="true"
                    />
                  </div>

                  <div
                    className={`flex items-center  border-2 text-base py-1 gap-x-1 w-fit pl-2 ${isDarkMode ? "border-white" : "border-black"
                      }`}
                  >
                    <p className="flex items-center  text-base">
                      UnPaid: &#8377;
                    </p>
                    <input
                      value={grandtotal - discount - paid}
                      className={`  w-[30%]   flex items-center  border-none outline-none bg-transparent  ${isDarkMode ? "bg-gray-800 " : "bg-white "
                        }`}
                      required="true"
                      readOnly
                    />
                  </div>
                </div>
              </>
            }
          </div>

          <div
            className={`w-full  flex justify-around items-center  ${isDarkMode ? "bg-[#111827]" : "bg-white"
              } text-${isDarkMode ? "white" : "gray-800"} p-4`}
          >
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-full  flex justify-center items-center gap-2   "
              onClick={getBill}
            >
              {!loading ? (
                <FaRupeeSign className="text-2xl font-bold"></FaRupeeSign>
              ) : (
                <Spinner />
              )}
            </button>
          </div>
        </div>
      </LayoutNew >



    </>
  );
};

export default AddBills;
