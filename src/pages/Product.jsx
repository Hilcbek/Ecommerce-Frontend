import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { baseUrl } from "../../libs/op";
import { SlReload } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { ADD_PRODUCT } from "../../Toolkit/ProductSlice";
import useCart from "../../Hooks/useCartHook";
import { toast } from "react-hot-toast";
const Product = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 768px)",
  });
  let dropSize = useRef();
  let [open, setOpen] = useState(false);
  let [quantity, setQuantity] = useState(1);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    let handleDrop = (e) => {
      if (!dropSize?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleDrop);
  }, []);
  let [drop, setDrop] = useState(false);
  let [product, setProduct] = useState(null);
  let id = useLocation().pathname.split("/")[2];
  useEffect(() => {
    let Fetch = async () => {
      setLoading(true);
      baseUrl
        .get(`/product/${id}`)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setProduct(data.data);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    };
    Fetch();
  }, [id]);
  let [color, setColor] = useState(product?.colors?.[0]);
  let [image, setImage] = useState(null);
  let [options, setOptions] = useState({
    ColorChoice: product?.colors?.[0],
    SizeChoice: product?.size?.[0],
  });
  useEffect(() => {
    setOptions({
      ColorChoice: product?.colors?.[0],
      SizeChoice: product?.size?.[0],
    });
  }, [product]);
  let cartModal = useCart();
  let handleImage = (e) => {
    setImage(e.target.src);
  };
  let dispatch = useDispatch();
  let handleAddToCart = () => {
    dispatch(
      ADD_PRODUCT({
        ...product,
        amount: quantity,
        ChoiceSize: options.SizeChoice,
        ChoiceColor: options.ColorChoice,
      })
    );
    toast.success("Item added successfully", {
      position: "top-left",
    });
  };
  return (
    <div className="w-full min-h-[100vh] pt-[75.2px] transition-all lg:pb-0 gap-4 pb-3 lg:flex-row xs:flex-col duration-300 ease-linear bg-white flex items-center justify-center">
      <div className="w-[98%] mx-auto md:w-full md:ml-5 h-full flex items-start gap-2 justify-start md:flex-row flex-col-reverse relative">
        <div className="flex md:w-fit w-full gap-2 items-start justify-start flex-row md:flex-col">
          {product?.img?.map((i, idx) => (
            <div
              key={idx}
              className="md:w-40 h-32 z-[99999999] border-solid border-[2px] hover:border-gray-800 border-transparent hover:shadow-lg transition-all ease-linear duration-100 cursor-pointer"
            >
              <img
                onMouseOver={handleImage}
                src={i}
                className="w-full h-full object-contain"
                alt="None"
              />
            </div>
          ))}
        </div>
        <div className="w-full md:w-10/12 md:h-[800px] p-5">
          <div
            className="absolute top-0 left-0 w-full h-full mix-blend-hue"
            style={{ backgroundColor: color }}
          ></div>
          <img
            className="z-[999] w-full h-full object-contain"
            style={{ color: color }}
            src={image || product?.img?.[0]}
            alt=""
          />
        </div>
      </div>
      <div className="w-full md:mr-10 h-full gap-2 lg:gap-8 flex items-start justify-center flex-col overflow-hidden px-3 lg:px-0">
        <h1 className="text-3xl lg:text-4xl tracking-widest font-Roboto relative before:absolute before:left-32 before:bottom-0 before:w-6/12 before:h-[1px] before:bg-black before:content-[''] after:absolute after:left-20 lg:after:left-42 md:after:-bottom-4 after:w-6/12 after:h-1 after:bg-black after:content-['']">
          {product?.title}
        </h1>
        <p
          onClick={() => setDrop((drop) => !drop)}
          className="md:w-10/12 font-Roboto w-full cursor-pointer"
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {isDesktopOrLaptop
            ? String(product?.desc)
                .substring(0, drop ? product?.desc?.length : 217)
                .concat("...")
            : product?.desc}
        </p>
        <div className="bg-white font-Roboto shadow-sm flex items-center justify-center gap-3  font-bold px-2 p-1">
          {product?.old_price > 0 && (
            <span className="line-through">${product?.old_price}</span>
          )}
          <span className="ml-2">${product?.new_price}</span>
        </div>
        <div className="flex items-center justify-start gap-5 md:gap-0 w-full md:flex-row flex-col">
          <div className="flex items-center md:items-start justify-center md:justify-start gap-4 md:ml-4 my-3 colorScroll">
            {product?.colors?.map((color, idx) => (
              <div
                onClick={() => setOptions({ ...options, ColorChoice: color })}
                key={color}
                className={`${
                  options.ColorChoice === color && "scale-[1.2]"
                } w-5 h-5 rounded-full active:scale-[.93] cursor-pointer before:absolute before:content-[""] before:h-7 before:w-7 before:border-solid before:border-[1px] before:rounded-full before:-top-[4px] before:-left-1 before:border-gray-400 relative`}
                style={{ backgroundColor: color, borderColor: color }}
              ></div>
            ))}
          </div>
          <div
            ref={dropSize}
            className="mx-auto relative md:ml-10 flex mb-5 sm:mt-0 items-center justify-center flex-col"
          >
            <h1
              onClick={() => setOpen((prev) => !prev)}
              className="cursor-pointer transition duration-75 border-solid border-[1px] z-[9999] active:scale-[.94] border-black font-Roboto p-1 sm:p-2 w-60 md:w-28 text-center tracking-wide"
            >
              Size
            </h1>
            <div
              className={`${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-full"
              } absolute bg-white shadow-md transition-[.01s] font-Roboto transform rounded-md p-2 -top-36 z-[999] md:-top-20 left-2 lg:left-0`}
            >
              {product?.size?.map((size, idx) => (
                <p
                  onClick={() => {
                    setOptions({ ...options, SizeChoice: size });
                    setOpen((open) => !open);
                  }}
                  key={size}
                  className={`${
                    options.SizeChoice === size && "bg-gray-400"
                  } p-3 md:p-[7.2px] w-[215px] md:w-[100px] cursor-pointer border-solid border-gray-100 border-b-[1px] active:scale-[.98] text-xs font-medium`}
                >
                  {size}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-11/12 flex items-center justify-between lg:flex-row flex-col gap-2">
          <div className="flex items-center justify-start gap-3">
            <button
              disabled={quantity === 1}
              style={{ cursor: quantity === 1 ? "not-allowed" : "pointer" }}
              onClick={() => {
                setQuantity((quantity) => quantity - 1);
              }}
              className="w-8 z-[9999] h-8 rounded-sm flex items-center justify-center border-solid border-[1px] border-black"
            >
              -
            </button>
            <span className="mx-2 font-Roboto">{quantity}</span>
            <button
              onClick={() => setQuantity((quantity) => quantity + 1)}
              className="w-8 z-[9999] h-8 rounded-sm flex items-center justify-center border-solid border-[1px] border-black"
            >
              +
            </button>
          </div>
          <abbr title="reload quantity to 0">
            <button
              onClick={() => setQuantity(1)}
              className="w-9 h-9 flex z-[9999999999] active:scale-[.97] items-center justify-center hover:bg-gray-100 transition-all duration-200 ease-linear cursor-pointer"
            >
              <SlReload size={24} />
            </button>
          </abbr>
          <button
            onClick={handleAddToCart}
            className="p-3 flex items-center font-Roboto justify-center w-full md:w-60 border-solid border-[1px] font-medium tracking-wider cursor-pointer active:scale-[.98] transition duration-200 ease-linear border-black"
          >
            Add to Cart
            <CiShoppingCart size={24} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
