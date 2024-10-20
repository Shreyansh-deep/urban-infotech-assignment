import React from "react";
import Navbar from "../shared/Navbar";
import { TiTick } from "react-icons/ti";
import mandala1 from "../../assets/mandala_img2.png";
import mandala2 from "../../assets/mandala_img3.png";

const Confirmtion = () => {
  return (
    <div className="px-5 relative">
      <img
        src={mandala1}
        alt=""
        className="absolute -top-10 right-0 -z-10 opacity-70"
      />
      <img src={mandala2} alt="" className="absolute left-0 -z-10 " />
      <Navbar />
      <div className="w-full h-screen flex flex-col justify-center gap-10 items-center">
        <div className="w-12 h-12 rounded-full border flex items-center justify-center ">
          <TiTick className="text-green-700" size={40} />
        </div>
        <p className="text-textPrimary text-5xl">Your services has been updated!</p>
        <div className="w-96 h-12 rounded-lg flex items-center border-2 border-gray text-2xl justify-center text-textPrimary">Go to my services</div>
      </div>
    </div>
  );
};

export default Confirmtion;
