import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Home from './pages/Home';
import InitialPage from './pages/InitialPage';
import Login from './pages/Login';
import MobileNumberForm from './components/VerifyOTP/MobileNumber';
import VerifyOtpPage from './components/VerifyOTP/VerifyOtpPage';
import OTPVerification from './components/VerifyOTP/VerifyOtp';
import { Context } from './context/Context';
import Main from './pages/AdminPages/Main';
import AddCustomers from './pages/AdminPages/AddCustomers';
import GetBills from './pages/AdminPages/GetBills';
import Card from '../src/theme/DarkMode';
import { ThemeProvider } from './context/ThemeContext';
import AddItems from './pages/AdminPages/AddItems';
import Products from './pages/AdminPages/Products';
import ProductDetail from "./pages/AdminPages/ProductDetail";

import VerifyOTP from './pages/OtpVerification';
import ShowCustomerDetails from './pages/AdminPages/ShowCustomerDetails';

import ShowSingleBill from './pages/AdminPages/ShowSingleBill';
import MainNew from './pages/AdminPages/MainNew';
import LoginNew from './pages/LoginNew';
import CreateAccount from './pages/CreateAccount';
import Customers from './pages/AdminPages/Customer';
import AddBills from './pages/AdminPages/AddBills';
import ProductsList from './pages/AdminPages/ProductsList';
import ProductItemDetail from './pages/AdminPages/ProductItemDetail';
import GetCustomerBills from './pages/AdminPages/GetCustomerBills';
import GetSingleCustomerBill from './pages/AdminPages/GetSingleCustomerBill';
import ShowCustomerBills from './pages/AdminPages/ShowCustomerBills';


function App() {
  return (
    <>
      <Router>
        <Context>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<InitialPage />} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/login" element={<LoginNew />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/verify" element={<VerifyOTP />} />
              {/* <Route path="/dashboard" element={<Main />} /> */}
              <Route path="/dashboard" element={<MainNew />} />
              {/* <Route path="/add-customer" element={<AddCustomers />} /> */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/products" element={<Products/>} />
              <Route path="/products-list" element={<ProductsList/>} />
              <Route path="/get-bill" element={<GetBills />} />
              <Route path="/get-single-bill" element={<GetSingleCustomerBill />} />
              <Route path="/get-bills-all" element={<GetCustomerBills />} />
              <Route path="/darkmode" element={<Card />} />
              {/* <Route path="/add-items" element={<AddItems />} /> */}
              <Route path="/add-bills" element={<AddBills />} />
              <Route path="/invoice/:id" element={<ShowSingleBill />} />
              {/* <Route path="/customer-details/:id" element={<ShowCustomerDetails />} /> */}
              <Route path="/customer-details/:id" element={<ShowCustomerBills />} />
              <Route path="/product-details/:id" element={<ProductDetail />} />
              <Route path="/product-item-details/:id" element={<ProductItemDetail />} />
              
            </Routes>
          </ThemeProvider>
        </Context>
      </Router>
    </>
  );
}

export default App;
