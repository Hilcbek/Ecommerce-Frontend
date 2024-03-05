import React, { useEffect, useRef, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { ADD_PRODUCT } from "../../Toolkit/ProductSlice";
import { SlReload } from "react-icons/sl";
import useCart from "../../Hooks/useCartHook";
import { toast } from "react-hot-toast";
const Slider = ({ product, scroll }) => {
  let [drop, setDrop] = useState(false);
  let [quantity, setQuantity] = useState(1);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 768px)",
  });
  let [open, setOpen] = useState(false);
  let dropSize = useRef();
  useEffect(() => {
    let handleDrop = (e) => {
      if (!dropSize?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleDrop);
  }, []);
  let [options, setOptions] = useState({
    ColorChoice: product?.colors?.[0] || "",
    SizeChoice: product?.size?.[0] || "",
  });
  let dispatch = useDispatch();
  let handleAddToCart = () => {
    if (options.ColorChoice.length > 0 && options.SizeChoice.length > 0) {
      dispatch(
        ADD_PRODUCT({
          ...product,
          amount: quantity,
          ColorChoice: options.ColorChoice,
          SizeChoice: options.SizeChoice,
        })
      );
      toast.success("Item added successfully", {
        position: "top-left",
      });
    } else {
      toast.error("Make sure you have selected your item color & size!", {
        duration: 3000,
      });
    }
  };
  return (
    <div
      style={{ transform: `translateX(${scroll * -100}vw)` }}
      className="w-full h-full transition-all lg:pb-0 gap-4 pb-3 lg:flex-row xs:flex-col duration-300 ease-linear bg-white flex items-center justify-center"
    >
      <div className="w-screen h-full">
        <img
          src={product.img[2]}
          className="w-full h-full object-cover lg:object-contain"
          alt=""
        />
      </div>
      <div className="w-full h-full gap-3 lg:gap-6 flex items-start justify-center flex-col overflow-hidden px-3 lg:px-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-widest font-Quicksand font-light relative before:absolute before:left-32 before:bottom-0 before:w-6/12 before:h-1 before:bg-black before:content-[''] after:absolute after:left-20 lg:after:left-42 after:-bottom-4 after:w-6/12 after:h-1 after:bg-black after:content-['']">
          {product?.title}
        </h1>
        <p className="md:w-10/12 text-xl tracking-wider font-light">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {isDesktopOrLaptop
            ? String(product?.desc)
                .substring(0, drop ? product?.desc?.length : 217)
                .concat("...")
            : product?.desc}
        </p>
        <div className="bg-white font-light shadow-sm flex items-center justify-center gap-3 text-3xl px-2 p-1">
          {product?.old_price > 0 && (
            <span className="line-through">${product?.old_price}</span>
          )}
          <span className="ml-2">${product?.new_price}</span>
        </div>
        <div className="flex gap-4 md:gap-0 md:items-start w-full flex-col md:flex-row items-center justify-start">
          <div className="flex items-center md:items-start justify-center md:justify-start gap-4 ml-4 my-3 colorScroll">
            {product?.colors?.map((color) => (
              <div
                onClick={() => setOptions({ ...options, ColorChoice: color })}
                key={color}
                className={`${
                  options.ColorChoice.length > 0 &&
                  options.ColorChoice === color &&
                  "scale-[1.2]"
                } w-7 h-7 rounded-full active:scale-[.93] cursor-pointer before:absolute before:content-[""] before:h-9 before:w-9 before:border-solid before:border-[1px] before:rounded-full before:-top-[4px] before:-left-1 before:border-gray-400 relative transition duration-300 ease-in-out`}
                style={{ backgroundColor: color, borderColor: color }}
              ></div>
            ))}
          </div>
          <div
            ref={dropSize}
            className="mx-auto relative md:ml-10 w-full flex items-center justify-center flex-col"
          >
            <h1
              onClick={() => setOpen((prev) => !prev)}
              className="cursor-pointer p-3 border-solid border-[1px] z-[9999] active:scale-[.94] transition-all duration-200 ease-linear border-gray-500 rounded-[4px] w-full md:w-28 text-center tracking-wide"
            >
              Size
            </h1>
            <div
              className={`${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-full"
              } absolute bg-white shadow-md transition duration-300 ease-linear transform rounded-md p-2 -top-36 lg:-top-28 left-2 lg:left-[230px] w-full lg:w-3/12`}
            >
              {product?.size?.map((size) => (
                <p
                  onClick={() => setOptions({ ...options, SizeChoice: size })}
                  key={size}
                  className={`${
                    options.SizeChoice.length > 0 &&
                    options.SizeChoice === size &&
                    "bg-gray-400"
                  } md:p-[7.2px] w-full p-3 cursor-pointer border-solid border-gray-100 border-b-[1px] active:scale-[.98] text-xs font-medium transition duration-100`}
                >
                  {size}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-11/12 md:gap-0 gap-4 flex-col md:flex-row mx-auto flex items-center justify-between">
          <div className="flex items-center justify-center gap-5">
            <button
              disabled={quantity === 1}
              style={{ cursor: quantity === 1 ? "not-allowed" : "pointer" }}
              onClick={() => {
                setQuantity((quantity) => quantity - 1);
                setSizes({});
                setColors({});
              }}
              className="w-10 h-10 border-solid border-[1px] hover:border-sky-500 transition-all duration-200 ease-linear border-gray-200"
            >
              -
            </button>
            <span className="w-6">{quantity}</span>
            <button
              onClick={() => setQuantity((quantity) => quantity + 1)}
              className="w-10 h-10 border-solid border-[1px] hover:border-sky-500 transition-all duration-200 ease-linear border-gray-200"
            >
              +
            </button>
          </div>
          <abbr title="reload quantity to 0">
            <button
              disabled={quantity === 1}
              onClick={() => {
                setQuantity(1);
                setColors([]);
                setSizes([]);
              }}
              className="w-9 h-9 flex z-[9999999999] active:scale-[.97] items-center justify-center hover:bg-gray-100 transition-all duration-200 ease-linear cursor-pointer"
            >
              <SlReload />
            </button>
          </abbr>
          <button
            onClick={handleAddToCart}
            className="p-3 w-full flex items-center justify-center md:w-60 border-solid border-[1px] font-medium tracking-wider cursor-pointer active:scale-[.98] transition duration-200 ease-linear border-gray-400"
          >
            Add to Cart <CiShoppingCart size={24} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
