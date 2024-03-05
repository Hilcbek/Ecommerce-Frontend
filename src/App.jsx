import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import ProductsList from "./pages/ProductsList";
import Product from "./pages/Product";
import { Toaster } from "react-hot-toast";
import useCart from "../Hooks/useCartHook";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  let { username } = useSelector((state) => state.user);
  let { success } = useSelector((state) => state.product)
  return (
    <div className="font-Quicksand relative w-full h-full">
      <BrowserRouter>
        <NavBar />
        <Register />
        <Login />
        <Toaster
          position="top-center"
          containerStyle={{
            marginTop: 10,
            fontWeight: "600",
            zIndex: 100000000000000,
            fontSize: 15,
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/success" element={success && username ? <Success /> : <Navigate to={'/'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
