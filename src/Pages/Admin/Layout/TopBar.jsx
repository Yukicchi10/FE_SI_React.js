import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import LogoSI from "../../../Img/LogoSI.png";
import { ModalLogout } from "../../../Component/Modal";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="w-full pl-12 bg-gray-300 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <img src={LogoSI} alt="logo" className="w-48" />
          <FiLogOut size={24} className="cursor-pointer" onClick={() => setOpen(true)} />
        </div>
      </nav>
      <ModalLogout open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default TopBar;
