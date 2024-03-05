import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link to={`/products/?cat=${category.cat}`} className="w-full h-[60vh] relative">
      <div className="w-full h-full">
        <img src={category.img} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="absolute flex items-center justify-center flex-col top-[50%] left-[20%] gap-3">
        <h1 className="md:text-4xl text-white font-Roboto font-light tracking-wider p-3 text-center">
          {category?.title}
        </h1>
        <button className="p-3 bg-white active:scale-[.92] transition duration-300 ease-linear font-light">
          SHOP NOW
        </button>
      </div>
    </Link>
  );
};

export default CategoryItem;
