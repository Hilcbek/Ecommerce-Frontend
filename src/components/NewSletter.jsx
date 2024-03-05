import React from "react";

const NewSletter = () => {
  return (
    <div className="bg-white w-full sm:h-[40vh] h-auto py-10 md:py-0 flex items-center justify-center flex-col">
      <h1 className="font-light tracking-widest text-4xl lg:text-7xl">Newsletter</h1>
      <h2 className="my-3 md:text-2xl font-light">
        Get timely updates from favorite products!
      </h2>
      <div className="flex items-center justify-center w-full lg:px-0 px-4 lg:w-7/12 mx-auto">
        <input
          className="p-3 outline-none bg-transparent border-solid border-[1px] border-gray-200 w-full"
          placeholder="Your email"
          type="text"
          name=""
          id=""
        />
        <button className="p-3 bg-sky-500 text-white cursor-pointer w-auto ml-2 px-2 border-solid border-[1px] border-transparent hover:border-sky-500 hover:bg-transparent hover:text-sky-500 active:scale-[.95] transition duration-150 ease-linear">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewSletter;
