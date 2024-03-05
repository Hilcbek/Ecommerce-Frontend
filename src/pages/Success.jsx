import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RESET_PRODUCT } from "../../Toolkit/ProductSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
const Success = () => {
  let { username } = useSelector((state) => state.user);
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(RESET_PRODUCT({}))
  },[])
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-full sm:w-8/12 md:w-6/12 lg:w-5/12 flex items-center justify-center flex-col shadow-xl p-3 gap-5 rounded-md">
        <h1 className="text-xl font-semibold font-Poppins text-center text-[#009866]">
          You have Successfully done your payment!
        </h1>
        <div>
          <img src="/stripe.png" alt="" />
        </div>
        <h1 className="text-center text-xl font-Quicksand font-medium">
          Thanks for your visit Mr.{" "}
          <span className="uppercase tracking-wider">{username}</span>!
        </h1>
        <Link to={'/'} className="p-3 rounded-md bg-black text-white cursor-pointer active:scale-[.96] transition-all duration-200 ease-linear">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
