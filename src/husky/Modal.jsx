import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import { CiUser } from "react-icons/ci";
import { CiVoicemail } from "react-icons/ci";
import { HiOutlineLockOpen } from "react-icons/hi2";
import Button from "./Button";
import { RiCloseFill } from "react-icons/ri";
import Button_Google from "./Button_Google";
const Modal = ({
  open,
  disabled,
  Header,
  Title,
  Body,
  Footer,
  onClose,
  onSubmit,
  onSubmit_2,
  disabled_2,
  label,
  label2,
  icon,
}) => {
  let [openModal, setOpenModal] = useState(open);
  useEffect(() => {
    setOpenModal(open);
  }, [open]);
  let handleClose = useCallback(() => {
    if (disabled) return;
    setOpenModal(false);
    setTimeout(() => {
      onClose();
    }, 800);
  }, [onClose, disabled]);
  let handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [onSubmit, disabled]);
  // let handleGoogleSubmit = useCallback(() => {
  //   if (disabled_2) return;
  //   onSubmit_2();
  // }, [disabled_2, onSubmit_2]);
  if (!open) return;
  return (
    <div className="fixed z-[9999999999] top-0 left-0 w-full h-screen bg-neutral-800/90 flex items-center justify-center">
      <div
        className={`${
          openModal
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } w-4/12 md:w-7/12 lg:w-5/12 xs:w-11/12 p-3 flex bg-[#FEFCFF] relative transition  font-Poppins rounded-xl items-center justify-center flex-col gap-3 shadow-md shadow-black/50`}
      >
        <div
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center border-solid border-gray-500 absolute top-2 right-3 cursor-pointer hover:bg-gray-200 rounded-full"
        >
          <RiCloseFill size={20} />
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-3xl tracking-widest text-center font-medium">
            {Header}
          </h1>
        </div>
        <div className="flex underline tracking-wider uppercase items-center justify-center font-medium">
          {Title}
        </div>
        <div className="w-full">{Body}</div>
        <Button
          disabled_2={disabled_2}
          disabled={disabled}
          onClick={handleSubmit}
          label={label}
        />
          <Button_Google
            disabled_2={disabled_2}
            disabled={disabled}
            icon={icon}
            onClick={onSubmit_2}
            label={label2}
          />
        <div className="flex items-center justify-center w-full p-2">
          {Footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
