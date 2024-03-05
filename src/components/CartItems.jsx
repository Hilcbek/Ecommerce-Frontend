import React from "react";
let pro = [
  {
    id: 1,
    title: "LOUNGE FLEECE SWEATSHIRT",
    desc: "Whether you're curled up on the couch or running errands around town, this adidas fleece crewneck sweatshirt keeps you cozy while expressing your laid-back style. The soft cotton and polyester blend fleece fabric and ribbed cuffs offer comfort that lasts from your morning latte to an evening chill session. Slip into the weekend in this go-to layer — its modern diamond collar and tonal adidas Badge of Sport add subtle flair so you look put together even when you'd rather lounge. By choosing recycled, we are able to reuse materials that have already been created, which helps to reduce waste. Renewable materials choices will help us to remove our reliance on finite resources. Our products made with a blend of recycled and renewable materials feature at least 70% total of these materials.",
    img: "/sliders/slide1.png",
    colors: ["yellow", "#04ad", "#009866", "teal", "black", "blue"],
    size: ["M", "S", "L", "XXL", "XL"],
  },
];
const CartItems = () => {
  return (
    <div className="w-full flex items-start gap-3 justify-start shadow-md bg-[#EAEEEF] p-2 cursor-pointer hover:bg-white transition duration-300 rounded-md">
      <div className="w-10/12 mx-auto gap-3 flex items-start justify-start  xl:flex-row flex-col">
        <div className="xs:w-8/12 md:w-5/12 xl:w-3/12 rounded-md">
          <img src={pro[0].img} className="w-full h-full rounded-md" alt="" />
        </div>
        <div className="flex items-start justify-start flex-col gap-5">
          <h1 className="font-semibold md:text-xl">
            Product: <span className="font-normal text-sm">{pro[0].title}</span>
          </h1>
          <h1 className="font-semibold md:text-xl">
            ID: <span className="font-normal text-sm">984348431844</span>
          </h1>
          <div className="w-8 h-8 rounded-full bg-black "></div>
          <h1 className="font-semibold md:text-xl">
            Size : <span className="font-normal text-sm">36.5</span>
          </h1>
        </div>
      </div>
      <div className="w-5/12 h-[21vh] flex items-center justify-between flex-col gap-4">
        <div className="flex items-center justify-center gap-4">
          <button className="w-10 h-10 rounded-[4px] cursor-pointer border-solid border-[1px] border-gray-300">
            -
          </button>
          <span>2</span>
          <button className="w-10 h-10 rounded-[4px] cursor-pointer border-solid border-[1px] border-gray-300">
            +
          </button>
        </div>
        <h1 className="text-2xl">$50</h1>
      </div>
    </div>
  );
};

export default CartItems;
