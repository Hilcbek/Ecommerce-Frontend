import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useCart from "../../Hooks/useCartHook";
import { FaDeleteLeft } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
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
  let cartModal = useCart();
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  let { username } = useSelector((state) => state.user);
  let handleClose = useCallback(() => {
    setShowModal(false);
    if (disabled) return;
    setTimeout(() => {
      cartModal.onClose();
    }, 300);
  }, [disabled]);
  let [showModal, setShowModal] = useState(open);
  useEffect(() => {
    setShowModal(open);
  }, [open]);
  let { products, total } = useSelector((state) => state.product);
  let handleDeleteFromCart = (id, color, size) => {
    dispatch(DELETE_PRODUCT({ id, color, size }));
    toast.success("Item removed from your cart successfully", {
      position: "top-left",
    });
  };
  let logModal = useLogin();
  let ResetCart = () => {
    dispatch(RESET_PRODUCT({}));
  };
  let handleAmountChange = (sign, id, color, size) => {
    dispatch(UPDATE_PRODUCT_AMOUNT({ sign, id, color, size }));
    toast.success("Item status updated successfully", {
      position: "top-center",
    });
  };
  let [cookies, setCookies] = useCookies();
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
          toast.error("Please " + err.response.data.error, {
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
    <div className="fixed top-0 right-0 font-Fredoka w-full h-full bg-neutral-800/80 z-[9999999999]">
      <div
        className={`${
          showModal
            ? "right-0 opacity-100 translate-x-0"
            : "-right-[110%] opacity-0 translate-x-full"
        } absolute top-0 transition-all transform ease-linear duration-300 h-full shadow-md shadow-black w-11/12 md:w-6/12 lg:w-5/12 xl:w-3/12 bg-white mx-auto flex items-start justify-start flex-col`}
      >
        <div
          onClick={handleClose}
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center border-solid border-gray-500 active:scale-[.96] border-[1px] transition-all ease-linear duration-200 active:border-gray-600  cursor-pointer"
        >
          <IoMdClose />
        </div>
        <div className="w-[99%] mx-auto tracking-widest flex items-start justify-start mt-4 flex-col gap-5 p-2">
          <h1 className="text-2xl md:text-3xl text-center font-light">
            Products in your cart!
          </h1>
          <div className="flex items-start tracking-normal w-full justify-start flex-col gap-3">
            {products?.length > 0 ? (
              products?.map(
                ({
                  _id,
                  title,
                  desc,
                  img,
                  amount,
                  new_price,
                  SizeChoice,
                  ColorChoice,
                }) => {
                  return (
                    <div
                      key={_id}
                      className="w-full flex p-1 items-start justify-start gap-3  border-solid border-gray-100 bg-gray-50 hover:bg-transparent cursor-pointer border-[1px]"
                    >
                      <div className="w-20 h-20 border-solid border-[1px] border-gray-200">
                        <img
                          src={img?.[0]}
                          alt="None"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-full">
                        <h1 className="w-full text-sm font-semibold text-black">
                          {title}
                        </h1>
                        <p className="text-xs">
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {String(desc).substring(0, 90).concat("...")}
                        </p>
                        <div className="flex items-center justify-start gap-3">
                          <div className="flex items-center justify-start my-1 gap-2">
                            <div
                              className={`w-3 h-3 rounded-full active:scale-[.93] cursor-pointer before:absolute before:content-[""] before:h-4 before:w-4 before:border-solid before:border-[1px] before:rounded-full before:-top-[2px] before:-left-[2px] before:border-gray-400 relative transition duration-300 ease-in-out`}
                              style={{
                                backgroundColor: ColorChoice,
                                borderColor: ColorChoice,
                              }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-start gap-2">
                            <div
                              className={
                                "bg-gray-200 text-xs border-solid border-gray-300 border-b-[1px] p-1"
                              }
                            >
                              {SizeChoice}
                            </div>
                          </div>
                        </div>
                        <h1 className="text-xs text-sky-500 font-bold">
                          {amount} x {new_price}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between flex-col h-full">
                        <div
                          onClick={() =>
                            handleDeleteFromCart(_id, ColorChoice, SizeChoice)
                          }
                          className="w-7 h-7 active:scale-[.92] hover:bg-rose-600 hover:text-white transition-all duration-300 ease-linear rounded-full flex items-center justify-center cursor-pointer border-solid border-[1px] border-gray-500"
                        >
                          <FaDeleteLeft size={13} />
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() =>
                              handleAmountChange(
                                "+",
                                _id,
                                ColorChoice,
                                SizeChoice
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center border-solid border-gray-300 border-[1px] text-xs"
                          >
                            +
                          </button>
                          <span className="text-xs">{amount}</span>
                          <button
                            onClick={() =>
                              handleAmountChange(
                                "-",
                                _id,
                                ColorChoice,
                                SizeChoice
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center border-solid border-gray-300 border-[1px] text-xs"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <h1 className="text-center text-rose-600 font-bold font-Roboto tracking-widest">
                No item left in your cart!
              </h1>
            )}
          </div>
          <div className="w-full flex font-Roboto items-center justify-between font-medium">
            <h1>SUBTOTAL</h1>
            <p className="text-sm">${Number(total).toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading || products.length === 0}
            style={{
              cursor: products.length > 0 ? "pointer" : "not-allowed",
            }}
            className={`${
              products.length > 0 && !loading
                ? "active:scale-[.96] bg-sky-500"
                : "bg-sky-300"
            } p-3 text-[11px] tracking-widest transition flex items-center gap-2 justify-center w-10/12 mx-auto duration-300 ease-in-out text-white`}
          >
            {cookies.access_token ? (
              loading ? (
                <>
                  <ClipLoader
                    color={"#fff"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />{" "}
                  <span className="">PROCESSING</span>
                </>
              ) : (
                "PROCEED TO CHECKOUT"
              )
            ) : (
              "LOGIN TO PROCEED TO CHECKOUT"
            )}
          </button>
          <button
            disabled={loading}
            onClick={ResetCart}
            className="text-rose-500 font-Roboto text-xl active:scale-[.97] transition duration-200 ease-in-out"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
