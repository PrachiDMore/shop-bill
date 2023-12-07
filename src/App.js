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


function App() {
  return (
    <>
      <Router>
        <Context>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<InitialPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login1" element={<LoginNew />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/verify" element={<VerifyOTP />} />
              <Route path="/dashboard" element={<Main />} />
              <Route path="/dashboard1" element={<MainNew />} />
              <Route path="/add-customer" element={<AddCustomers />} />
              <Route path="/products" element={<Products/>} />
              <Route path="/get-bill" element={<GetBills />} />
              <Route path="/darkmode" element={<Card />} />
              <Route path="/add-items" element={<AddItems />} />
              <Route path="/invoice/:id" element={<ShowSingleBill />} />
              <Route path="/customer-details/:id" element={<ShowCustomerDetails />} />
              <Route path="/product-details/:id" element={<ProductDetail />} />
              
            </Routes>
          </ThemeProvider>
        </Context>
      </Router>
    </>
  );
}

export default App;
