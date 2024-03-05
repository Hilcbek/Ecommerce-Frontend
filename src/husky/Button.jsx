import React from "react";
import { ClipLoader } from "react-spinners";
const Button = ({ label, disabled, onClick, icon, disabled_2 }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || disabled_2}
      style={{
        cursor: disabled || disabled_2 ? "not-allowed" : "pointer",
      }}
      className={`${
        disabled || disabled_2 ? "bg-black/70" : "bg-black"
      } p-4 text-sm font-Poppins tracking-widest gap-3 text-white active:scale-[.96] hover:bg-black/80 transition ease-linear cursor-pointer duration-200 rounded-md bg-black w-full`}
    >
      {disabled ? (
        <div className="flex items-center justify-center">
          <ClipLoader
            color={"#fff"}
            loading={disabled}
            size={19}
            aria-label="Loading Spinner"
            data-testid="loader"
          />{" "}
          <h1 className="text-sm ml-2">SIGNING YOU...</h1>
        </div>
      ) : (
        label
      )}
    </button>
  );
};
export default Button;
