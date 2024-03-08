import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useCart from "../../Hooks/useCartHook";
import { FaDeleteLeft } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import { MdOutlineShoppingBag, MdShoppingBag } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { CiBag1 } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";
import { FaInfo } from "react-icons/fa";

import {
  DELETE_PRODUCT,
  EnableTheSuccessPage,
  RESET_PRODUCT,
  UPDATE_PRODUCT_AMOUNT,
} from "../../Toolkit/ProductSlice";
import { baseUrl } from "../../libs/op";
import { LOGOUT_ACTION } from "../../Toolkit/Slice";
import useLogin from "../../Hooks/useLoginHook";
const Cart = ({ open, disabled }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 1108px)",
  });
  let cartModal = useCart();
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  let { username } = useSelector((state) => state.user);
  let handleClose = useCallback(() => {
    setShowModal(false);
    if (disabled) return;
    setTimeout(() => {
      cartModal.onClose();
    }, 400);
  }, [disabled]);
  let [showModal, setShowModal] = useState(open);
  useEffect(() => {
    setShowModal(open);
  }, [open]);
  let { products, total, amount } = useSelector((state) => state.product);
  let handleDeleteFromCart = (id, color, size) => {
    dispatch(DELETE_PRODUCT({ id, color, size }));
    toast.success("Item removed from your cart successfully", {
      position: "top-center",
    });
  };
  let logModal = useLogin();
  let ResetCart = () => {
    if (products.length > 0) {
      dispatch(RESET_PRODUCT({}));
      toast.success(
        products.length > 0
          ? "Products removed successfully"
          : "Product removed successfully!"
      );
    } else {
      toast.success("There is no product to remove!");
    }
  };
  let handleAmountChange = (sign, id, color, size) => {
    dispatch(UPDATE_PRODUCT_AMOUNT({ sign, id, color, size }));
    toast.success("Item status updated successfully", {
      position: "top-center",
    });
  };
  let [cookies, setCookies] = useCookies(["access_token"]);
  let handleCheckout = async () => {
    setLoading(true);
    baseUrl
      .post(
        "/checkout",
        {
          products,
        },
        {
          headers: {
            authorization: cookies.access_token,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch(EnableTheSuccessPage({}));
        window.location.href = data.url;
      })
      .catch((err) => {
        if (err.response.data.error === "token expired!") {
          baseUrl
            .post("/auth/logout")
            .then((response) => {
              return response.data;
            })
            .then((data) => {
              setCookies("access_token", "");
            })
            .catch((err) => {
              toast.error(err.response.data.error);
            });
          toast.error("Session expired! please login again");
          dispatch(LOGOUT_ACTION({}));
        }
        if (err.response.data.error !== "token expired!") {
          toast.error("Please it is " + err.response.data.error, {
            position: "top-center",
          });
        }
        if (err.response.data.error === "Sign in to your account!") {
          logModal.onOpen();
        }
      })
      .finally(() => {
        setLoading(false);
        cartModal.onClose();
      });
  };
  if (!open) return;
  return (
    <div className="fixed top-0 right-0 font-Fredoka flex items-center justify-center w-full h-full bg-neutral-800/90 z-[9999999999]">
      <div
        className={`${
          showModal ? "opacity-100 z-[9999999]" : "opacity-0 -z-0"
        } absolute transition-all p-5 pb-0 rounded-sm transform ease-linear duration-200 h-5/6 overflow-scroll gap-2 max-h-5/6 top-16 shadow-md shadow-black w-11/12 md:w-11/12 lg:w-10/12 xl:w-9/12 bg-white mx-auto flex items-start justify-start flex-col`}
      >
        <div
          onClick={handleClose}
          className="fixed top-2 right-2 w-8 h-8 flex items-center justify-center border-solid border-gray-500 active:scale-[.96] border-[1px] transition-all ease-linear duration-200 active:border-gray-600  cursor-pointer"
        >
          <MdOutlineClose />
        </div>
        <div className="w-11/12 mx-auto h-[100%] flex items-start justify-start flex-col">
          <div className="flex items-start gap-5 justify-start flex-col h-36 w-full bg-white/80 border-solid border-b-[1px] border-gray-100">
            <h1 className="flex text-2xl sm:text-4xl tracking-wider font-Roboto underline items-center justify-center gap-1">
              SHOPPING BAG (<MdOutlineShoppingBag size={32} />)
            </h1>
            {amount > 0 && (
              <p className="lg:text-xs font-Roboto font-bold text-gray-800">
                Currently your cart has {amount} items!
              </p>
            )}
            <h1
              className={`${
                isDesktopOrLaptop
                  ? "flex items-center text-sm sm:text-[16px] justify-start gap-1"
                  : "hidden"
              }`}
            >
              <FaInfo /> Scroll to right to see all the information
            </h1>
          </div>
          <div className="flex items-start overflow-scroll h-auto py-2 font-Roboto justify-start flex-col gap-2">
            {products?.length > 0 ? (
              products.map((product) => {
                return (
                  <div className="flex items-center justify-start gap-5 w-full border-solid border-b-[1px] p-2 border-gray-200">
                    <div
                      onClick={() =>
                        handleDeleteFromCart(
                          product._id,
                          product.ColorChoice,
                          product.SizeChoice
                        )
                      }
                      className="w-32 mr-4 p-2 active:scale-[.92] transition-all duration-300 ease-linear flex items-center justify-center cursor-pointer border-solid border-[1px] border-gray-500"
                    >
                      <MdOutlineClose size={20} />
                    </div>
                    <div className="md:w-7/12">
                      <img
                        className="w-full h-full object-contain"
                        src={product.img[0]}
                        alt=""
                      />
                    </div>
                    <div className="w-full flex items-start justify-start flex-col gap-4">
                      <h1 className="text-gray-700 text-xl">
                        {product?.title}
                      </h1>
                      <div className="flex items-center justify-start gap-1">
                        <span className="text-gray-400 text-xs">Art.No:</span>
                        <p className="text-sm text-gray-700">{product._id}</p>
                      </div>
                      <div className="flex items-center justify-start gap-2">
                        <span className="text-gray-400 text-xs">Colors:</span>
                        <div className="flex items-center justify-start gap-2">
                          <div
                            style={{
                              backgroundColor: product.ColorChoice,
                              borderColor: product.ColorChoice,
                            }}
                            className='w-3 h-3 rounded-full active:scale-[.93] cursor-pointer before:absolute before:content-[""] before:h-4 before:w-4 before:border-solid before:border-[1px] before:rounded-full before:-top-[2px] before:-left-[2px] before:border-gray-400 relative transition duration-300 ease-in-out'
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-start gap-1">
                        <span className="text-gray-400 text-xs">Size:</span>
                        <span className="text-xs">{product.SizeChoice}</span>
                      </div>
                    </div>
                    <div className="w-full text-xs font-bold flex items-center justify-center">
                      <h1>${product.new_price}</h1>
                    </div>
                    <div className="w-full flex items-center justify-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() =>
                            handleAmountChange(
                              "+",
                              product._id,
                              product.ColorChoice,
                              product.SizeChoice
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center border-solid border-black border-[1px] text-xs"
                        >
                          +
                        </button>
                        <span className="text-xs">{product.amount}</span>
                        <button
                          onClick={() =>
                            handleAmountChange(
                              "-",
                              product._id,
                              product.ColorChoice,
                              product.SizeChoice
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center border-solid border-black border-[1px] text-xs"
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="w-full text-xs font-bold flex items-center justify-center">
                      ${Number(product.new_price * product.amount).toFixed(2)}
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className=" gap-1 text-center text-4xl flex items-center justify-start font-bold font-Roboto tracking-widest">
                Empty Bag! <CiBag1 size={40} />
              </h1>
            )}
          </div>
          <div className="w-full sm:flex-row border-solid border-gray-100 border-t-[1px] flex-col font-bold font-Roboto tracking-wider text-xl flex items-center justify-center sm:justify-between">
            <div className="flex items-center justify-start gap-1">
              <h1 className="text-gray-600">Subtotal:</h1>
              <span className="text-[16px]">${Number(total).toFixed(2)}</span>
            </div>
            <div className="flex items-center mt-2 gap-3 justify-center flex-col">
              <button
                onClick={handleCheckout}
                disabled={loading || products.length === 0}
                style={{
                  cursor: products.length > 0 ? "pointer" : "not-allowed",
                }}
                className={`${
                  products.length > 0 && !loading
                    ? "active:scale-[.96] bg-black text-white text-sm"
                    : "bg-black/80"
                } p-4  text-white w-full text-sm`}
              >
                {cookies.access_token ? (
                  loading ? (
                    <div className="flex items-center justify-center gap-1">
                      <ClipLoader
                        color={"#fff"}
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />{" "}
                      <span className="">PROCESSING</span>
                    </div>
                  ) : (
                    <p>PROCEED TO CHECKOUT</p>
                  )
                ) : (
                  <p>LOGIN TO PROCEED TO CHECKOUT</p>
                )}
              </button>
              <button
                disabled={loading}
                onClick={ResetCart}
                className="text-black border-solid border-black border-[1px] w-full p-4 text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
