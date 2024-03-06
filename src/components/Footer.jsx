import React from "react";
import { ImLocation2 } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full bg-white list-none flex items-start lg:gap-10 justify-center flex-col lg:justify-between px-4 gap-3 md:px-10">
      <div className="w-full bg-white list-none flex items-start lg:gap-10 justify-center lg:flex-row flex-col lg:justify-between px-4 gap-3 md:px-10">
        <div className="w-full gap-5 flex items-start justify-start flex-col">
          <h1 className="text-2xl font-Roboto font-bold">HULU.</h1>
          <p>
            In the bustling realm of online commerce, we at{" "}
            <span className="font-bold text-xl mx-2">HULU.</span>
            stand at the forefront of innovation, weaving together technology,
            convenience, and unparalleled customer experience. As you navigate
            through our virtual aisles, we invite you to embark on a journey
            where every click unlocks a world of possibilities.
          </p>
          <div className="flex items-center justify-start gap-3">
            <div className="w-8 h-8 rounded-full">
              <img
                src="/social/face.png"
                className="w-full h-full rounded-full object-contain"
                alt=""
              />
            </div>
            <div className="w-8 h-8 rounded-full">
              <img
                src="/social/insta.png"
                className="w-full h-full rounded-full object-contain"
                alt=""
              />
            </div>
            <div className="w-8 h-8 rounded-full">
              <img
                src="/social/tik.png"
                className="w-full h-full rounded-full object-contain"
                alt=""
              />
            </div>
            <div className="w-8 h-8 rounded-full">
              <img
                src="/social/twit.png"
                className="w-full h-full rounded-full object-contain"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-full flex h-full items-start justify-start flex-col md:pl-10">
          <h1 className="md:mb-3 font-semibold text-2xl">Useful Links</h1>
          <div className="flex md:gap-10 items-center justify-start">
            <div className="flex items-start justify-start flex-col gap-3">
              <li className="hover:underline cursor-pointer">Home</li>
              <li className="hover:underline cursor-pointer">Man Fashion</li>
              <li className="hover:underline cursor-pointer">Accessories</li>
              <li className="hover:underline cursor-pointer">Order Tracking</li>
              <li className="hover:underline cursor-pointer">Wishlist</li>
            </div>
            <div className="flex items-start justify-start flex-col gap-3">
              <li className="hover:underline cursor-pointer">Cart</li>
              <li className="hover:underline cursor-pointer">Women Fashion</li>
              <li className="hover:underline cursor-pointer">My Account</li>
              <li className="hover:underline cursor-pointer">Wishlist</li>
              <li className="hover:underline cursor-pointer">
                Terms and conditions
              </li>
            </div>
          </div>
        </div>
        <div className="w-full flex items-start justify-start flex-col gap-5">
          <h1 className="md:mb-3 font-semibold text-2xl">Contacts</h1>
          <h1 className="flex items-center justify-start gap-2">
            <ImLocation2 /> <span>566, Kirkos, Addis Ababa , Ethiopia</span>
          </h1>
          <h1 className="flex items-center justify-start gap-2">
            <FaPhoneAlt /> <span>+132-988-889-000</span>
          </h1>
          <h1 className="flex items-center justify-start gap-2">
            <MdOutlineLocalPostOffice /> <span>balemayehu07@gmail.com</span>
          </h1>
          <div className="flex items-center justify-start gap-3">
            <div className="w-10 border-solid border-[1px] border-gray-300 cursor-pointer rounded-sm p-2">
              <img src="/social/master.png" alt="" />
            </div>
            <div className="w-10 border-solid border-[1px] border-gray-300 cursor-pointer rounded-sm p-2">
              <img src="/social/express.png" alt="" />
            </div>
            <div className="w-10 border-solid border-[1px] border-gray-300 cursor-pointer rounded-sm p-2">
              <img src="/social/ali.png" alt="" />
            </div>
            <div className="w-10 border-solid border-[1px] border-gray-300 cursor-pointer rounded-sm p-2">
              <img src="/social/visa.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 flex items-center justify-between p-2">
        <Link to={"/"}>
          <img className="cursor-pointer" src="/logo.png" width={32} alt="" />
        </Link>
        <Link
          className="font-Roboto hover:underline"
          to={"/https://balem.vercel.app/"}
        >
          Developer.
        </Link>
        <p className="text-xs text-gray-400 font-bold">
          All rights are reserved &copy; 2024E.c
        </p>
      </div>
    </footer>
  );
};

export default Footer;
