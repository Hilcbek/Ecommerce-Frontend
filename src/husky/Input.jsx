import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Input = ({
  disabled,
  disabled2,
  label,
  icon,
  errors,
  id,
  register,
  required,
  type = "text",
}) => {
  let [open, setOpen] = useState(false);
  return (
    <div className="w-full relative font-Poppins">
      {type === "password" && (
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="absolute bg-gray-200 w-9 h-9 rounded-full cursor-pointer flex items-center justify-center top-2 border-solid border-gray-400 active:scale-[.97] transition-all ease-linear duration-200 border-[1px] right-5"
        >
          {!open ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
      {type === "password" ? (
        <input
          id={id}
          {...register(id, { required })}
          disabled={disabled || disabled2}
          type={open ? "text" : "password"}
          className={`${
            errors[id]
              ? "border-rose-500"
              : "border-gray-400 focus:border-gray-500"
          } ${
            disabled || disabled2 ? "bg-gray-100" : "bg-transparent"
          } w-full p-4 pl-8 peer rounded-md text-sm border-solid border-[1px] outline-none`}
        />
      ) : (
        <input
          id={id}
          {...register(id, { required })}
          disabled={disabled || disabled2}
          type={type}
          className={`${
            errors[id]
              ? "border-rose-500"
              : "border-gray-400 focus:border-gray-500"
          } ${
            disabled || disabled2 ? "bg-gray-100" : "bg-transparent"
          } w-full p-4 pl-4 peer rounded-md text-sm border-solid border-[1px] outline-none`}
        />
      )}
      <label
        className={`${errors[id] ? "text-rose-500" : "text-black"} ${
          disabled || disabled2 ? "bg-transparent" : "text-black bg-white"
        } text-xs flex items-center justify-center gap-1 px-1font-medium peer-focus:scale-[.94] scale-100 tracking-wide peer-focus:-translate-y-3 transition-all ease-linear duration-200 translate-y-0 transform absolute top-1 left-3`}
        htmlFor={id}
      >
        {icon}
        {label}
      </label>
    </div>
  );
};

export default Input;
