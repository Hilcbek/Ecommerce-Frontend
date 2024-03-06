import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useLocation } from "react-router-dom";
import useCart from "../../Hooks/useCartHook";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { LOGOUT_ACTION } from "../../Toolkit/Slice";
import { baseUrl } from "../../libs/op";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { RESET_PRODUCT } from "../../Toolkit/ProductSlice";
import useRegister from "../../Hooks/useRegisterHook";
import useLogin from "../../Hooks/useLoginHook";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const NavBar = () => {
  let { username } = useSelector((state) => state.user);
  let [cookies, setCookies] = useCookies();
  let { amount, products, total } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  let cartModal = useCart();
  let regModal = useRegister();
  let logModal = useLogin();
  let handleLogout = () => {
    baseUrl
      .post("/auth/logout")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        toast.success(`logged out!`, {
          position: "top-center",
        });
        setCookies("access_token", "");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(() => {
        dispatch(LOGOUT_ACTION({}));
        dispatch(RESET_PRODUCT({}));
      });
  };
  let [open, setOpen] = useState(false);
  return (
    <nav className={`fixed w-full top-0 z-[9999999999] bg-white`}>
      <Cart open={cartModal.open} disabled={false} />
      <div
        className={
          "w-full flex items-center justify-between py-1  px-2 md:px-12"
        }
      >
        <ul className="w-9">
          <Link to={"/"} className="w-full h-full">
            <img
              src="/logo.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        </ul>
        <Link to={"/"} className="flex items-center justify-center">
          <h1 className="font-bold xs:text-xl sm:text-2xl font-Roboto tracking-wider flex items-center justify-start flex-col lg:flex-row">
            HULU.{" "}
            <span className="text-xs text-gray-500 font-extralight">
              (Version 2.0)
            </span>
          </h1>
        </Link>
        <ul className="lg:flex hidden items-center justify-center text-sm gap-4">
          <>
            {cookies?.access_token ? (
              <>
                <p className="flex font-bold items-center justify-start gap-2">
                  Hello! 👋 <span>{username}</span>
                </p>
                <button
                  onClick={() => {
                    handleLogout();
                    cartModal.onClose();
                  }}
                  className="p-1 text-[12px] border-solid border-gray-300 border-[1px] rounded-[4px]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={regModal.onOpen}
                  className="p-1 text-[13px] font-semibold tracking-widest border-solid border-gray-500 border-[1px] rounded-[4px]"
                >
                  SIGN-UP
                </button>
                <button
                  onClick={logModal.onOpen}
                  className="p-1 text-[13px] font-semibold tracking-widest border-solid border-gray-500 border-[1px] rounded-[4px]"
                >
                  SIGN-IN
                </button>
              </>
            )}
          </>
          <button
            onClick={cartModal.onOpen}
            className="w-9 h-9 flex items-center justify-center relative"
          >
            <p className="w-5 h-5 -right-2 text-xs -top-1 flex items-center justify-center absolute rounded-full bg-[#053766] text-white">
              {amount}
            </p>
            <MdOutlineShoppingBag size={32} />
          </button>
        </ul>
        <ul
          className={`${
            open ? "right-0" : "-right-[110%]"
          } lg:hidden absolute flex-col transition-all ease-linear rounded-md h-[400px] w-10/12  shadow-lg shadow-black/80 z-[99999999] top-0 flex items-center pr-4 bg-white justify-center text-sm gap-4`}
        >
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center rounded-full border-solid border-[1px] border-gray-400 fixed top-3 right-3"
          >
            {open ? <IoCloseSharp /> : <AiOutlineMenu />}
          </div>
          <div className="flex items-start justify-start text-xl pl-6 flex-col h-full w-full pt-10 gap-2">
            {cookies?.access_token ? (
              <div className="flex items-center justify-center w-full h-full flex-col gap-4">
                <p
                  className={`${
                    username.length > 12 ? "flex-col" : "flex-row"
                  } flex w-full font-bold text-2xl items-start justify-start gap-2 overflow-x-scroll`}
                >
                  <span>Hello! 👋 </span>
                  <span>{username}</span>
                </p>
                <button
                  onClick={() => {
                    handleLogout();
                    cartModal.onClose();
                  }}
                  className="p-4 w-full text-xl font-bold border-solid border-black border-[1px] rounded-[4px]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center w-full h-full justify-center flex-col gap-2">
                <button
                  onClick={() => {
                    regModal.onOpen();
                    setOpen(false);
                  }}
                  className="p-3 text-[13px] ml-3 w-full font-semibold tracking-widest border-solid border-gray-500 border-[1px] rounded-[4px]"
                >
                  SIGN-UP
                </button>
                <button
                  onClick={() => {
                    logModal.onOpen();
                    setOpen(false);
                  }}
                  className="p-3 text-[13px] ml-3 w-full font-semibold tracking-widest border-solid border-gray-500 border-[1px] rounded-[4px]"
                >
                  SIGN-IN
                </button>
              </div>
            )}
          </div>
        </ul>
        <button
          onClick={cartModal.onOpen}
          className="mr-14 mt-2 w-9 h-9 lg:hidden flex items-center justify-center relative"
        >
          <p className="w-5 h-5 -right-2 text-xs -top-1 flex items-center justify-center absolute rounded-full bg-[#053766] text-white">
            {amount}
          </p>
          <MdOutlineShoppingBag size={32} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
