import React from "react";
import CategoryItem from "./CategoryItem";
const categories = [
  {
    id: 1,
    img: "/category/first.png",
    title: "SHIRT STYLE!",
    cat: "T-shirt",
  },
  {
    id: 2,
    img: "/category/second.png",
    title: "LOUNGEWEAR LOVE",
    cat: "light t-shirt",
  },
  {
    id: 3,
    img: "/category/third.png",
    title: "LIGHT JACKETS",
    cat: "jacket",
  },
];

export const Categories = () => {
  return (
    <div className="w-full grid lg:grid-cols-3 xs:grid-cols-1 md:grid-cols-2 gap-2 px-3">
      {categories.map((category,idx) => (
        <CategoryItem key={idx} category={category} />
      ))}
    </div>
  );
};

//category
