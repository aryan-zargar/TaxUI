import React, { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/inter";
import { ToastContainer, toast } from "react-toastify";
import "./toast.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/auth/login";
import SidebarLayout from "./Components/base/sidebarLayout";
import Register from "./Components/auth/register";
import Products from "./Components/Pages/Products";
import ProductTypes from "./Components/Pages/ProductType";
import ProductHolder from "./Components/Pages/ProductHolder";
import Storages from "./Components/Pages/Storage";
import Customers from "./Components/Pages/Customer";
import AddInvoice from "./Components/Pages/AddInvoice";
import SearchInCustomers from "./Components/Pages/SearchInCustomers";
import DefinedServiceCost from "./Components/Pages/DefinedServiceCost";
function App() {
  var [isLogedIn, setLoginState] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("token") == "" && window.location.pathname!="/login" && window.location.pathname!="/register") {
      window.location.pathname = '../../../../login'
      
    } else if(window.location.pathname!="/products") {
      setLoginState(false);

    }
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path="/products" element={<Products />} />
            <Route path="/productTypes" element={<ProductTypes />} />
            <Route path="/productHolder" element={<ProductHolder />} />
            <Route path="/storage" element={<Storages />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/addInvoice" element={<AddInvoice />} />
            <Route path="/searchCustomers" element={<SearchInCustomers />} />
            <Route path="/DefinedService" element={<DefinedServiceCost />} />

          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Redirect/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer style={{ fontFamily: "Rubik" }} />
    </>
  );
}

function Redirect(){
  window.location.pathname = '/products'
  return (
    <div></div>
  )
}

export default App;
