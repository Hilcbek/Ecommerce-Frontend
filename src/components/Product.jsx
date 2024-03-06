import React, { useEffect, useRef, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PRODUCT } from "../../Toolkit/ProductSlice";
import useCart from "../../Hooks/useCartHook";
import { toast } from "react-hot-toast";
const Product = ({ product }) => {
  let cartModal = useCart();
  let [image, setImage] = useState(product?.img?.[0]);
  let [quantity, setQuantity] = useState(1);
  // let { amount } = useSelector((state) => state.product);
  let handleHover = (e) => {
    setImage(e.target.src);
  };
  let handleLeave = () => {
    setImage(product?.img?.[0]);
  };
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
    <div className="w-full flex items-center group justify-between flex-col h-[380px] bg-white relative border-solid border-[1px] hover:shadow-xl hover:border-transparent border-gray-200 cursor-pointer overflow-hidden transition-all duration-300 ease-linear group">
      <div
        className={`gap-1 z-[99999999] w-fit transition-all duration-200 ease-linear flex absolute top-1 group-hover:right-0 xl:-right-52 right-1 items-center justify-center flex-col`}
      >
        <abbr title="Add to cart">
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 border-solid hover:border-sky-500 transition-all duration-200 ease-linear cursor-pointer border-[1px] active:scale-[.97] rounded-full bg-gray-100 flex items-center justify-center"
          >
            <GiShoppingCart size={14} />
          </button>
        </abbr>
        <abbr title={`more about ${product.title}`}>
          <Link
            to={`/product/${product?._id}`}
            className="w-10 h-10 border-solid hover:border-sky-500 transition-all duration-200 ease-linear cursor-pointer border-[1px] active:scale-[.97] rounded-full bg-gray-100 flex items-center justify-center"
          >
            <GrSearch size={14} />
          </Link>
        </abbr>
        <div className="flex items-end justify-end h-full flex-col gap-3">
          {product?.size?.map((size, idx) => {
            return (
              <div
                onClick={() => setOptions({ ...options, SizeChoice: size })}
                key={idx}
                className={`${
                  options.SizeChoice.length > 0 &&
                  options.SizeChoice === size &&
                  "bg-gray-400"
                } text-xs border-solid flex items-center justify-center text-center border-gray-300 border-b-[1px] p-1`}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>
      <Link
        to={`/product/${product?._id}`}
        className="w-full h-[calc(100%-140px)] group-hover:h-[calc(100%-140px)]"
      >
        <img src={image} className="w-full h-full object-contain" alt="" />
      </Link>
      <div className="md:flex hidden w-full md:group-hover:flex items-start gap-1 -mb-5 px-1 justify-start">
        {product?.img?.map((c, idx) => (
          <div
            key={idx}
            className="w-14 h-14 border-solid p-[1px] bg-white/50 hover:border-[0px] hover:border-b-[1px] border-[1px] mb-3 border-transparent hover:border-b-black transition duration-200 ease-linear"
          >
            <img
              onMouseOver={handleHover}
              onMouseLeave={handleLeave}
              src={c}
              alt=""
              className="w-full h-[98%] object-contain"
            />
          </div>
        ))}
      </div>
      <div className="bg-gray-50 relative w-full py-2 pl-2 flex items-start justify-start flex-col md:gap-0 gap-3">
        <div className="bg-gray-50 shadow-sm absolute -top-3 left-1 text-xs rounded-sm px-2 p-1">
          <span className="line-through">${product?.old_price}</span>
          <span className="ml-2 font-bold">${product?.new_price}</span>
        </div>
        <h1 className="font-Roboto font-semibold">{product.title}</h1>
        <div className="flex items-center md:items-start justify-center md:justify-start gap-3 my-2 colorScroll">
          {product?.colors?.map((color) => (
            <div
              onClick={() => setOptions({ ...options, ColorChoice: color })}
              key={color}
              className={`${
                options.ColorChoice.length > 0 &&
                options.ColorChoice === color &&
                "scale-[1.4]"
              } w-7 md:w-4 h-7 md:h-4 rounded-full active:scale-[.93] cursor-pointer before:absolute before:content-[""] md:before:w-5 md:before:h-5 before:h-8 before:w-8 before:border-solid before:border-[1.4px] before:rounded-full before:-top-[2px] before:-left-[2px] before:border-gray-300 relative`}
              style={{ backgroundColor: color, borderColor: color }}
            ></div>
          ))}
        </div>
        <div className="w-full flex items-center justify-start gap-1">
          {product?.categories?.map((cat, idx) => (
            <p key={idx} className="font-Roboto font-medium text-xs">
              {cat}
              {idx < product?.categories.length - 1 ? "," : ""}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
