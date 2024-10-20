import React, { useState } from "react";
import familyBg from "../../assets/family_bg_img.png";
import panditJi from "../../assets/panditJi_img.png";
import mandala from "../../assets/mandala_bg_img.png";
import Navbar from "../shared/Navbar";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Home = ({setPanditDetail,panditDetail}) => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleNumberSubmit = async () => {
    setNumber(inputValue);
    setInputValue("");

    const data = {
      contact_number: inputValue,
    };

    try {
      const response = await fetch(
        "https://test.backend.urbanoinfotech.com/api/v1/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      toast(responseData.message);
    } catch (error) {
      toast("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async () => {
    setOtp(inputValue);
    setInputValue("");

    const data = {
      contact_number: number,
      otp: inputValue,
    };

    try {
      const response = await fetch(
        "https://test.backend.urbanoinfotech.com/api/v1/pandit-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      toast(responseData.message);
      setPanditDetail(responseData)
      navigate('/createprofile');
    } catch (error) {
      toast("Error sending OTP:", error);
    }
  };

  return (
    <div className="px-5 relative">
      <img
        src={familyBg}
        alt=""
        className="absolute left-0 top-0 w-2/5 h-screen -z-10 -mt-5"
      />
      <img
        src={panditJi}
        alt=""
        className="absolute right-0 top-40 w-[596px] h-[568px]"
      />
      <img
        src={mandala}
        alt=""
        className="absolute top-64 right-0 -z-10 opacity-50"
      />
      <Navbar
        children={
          <p className="text-white text-xl mr-32 cursor-pointer">
            Don't have a account?
          </p>
        }
      />
      <div className="flex w-full justify-evenly items-center h-96 pt-60 -ml-28">
        <div className="flex flex-col gap-14">
          <p className="font-bold text-6xl lora">Log In</p>
          <div className="flex flex-col gap-2">
            {number ? (
              <p className="text-textPrimary text-2xl">Enter OTP</p>
            ) : (
              <p className="text-textPrimary text-2xl">Enter Mobile No.</p>
            )}
            <input
              type="text"
              placeholder="Value"
              className="rounded-lg p-2 w-96"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div
            className="text-white bg-primary w-96 h-10 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={number ? handleOtpSubmit : handleNumberSubmit}
          >
            Submit
          </div>
          <ToastContainer />
        </div>
        <div>
          <p className="text-5xl leading-relaxed yatra-one-regular">
            पूजा पाठ हो या अनुष्ठान,
            <br />
            <span className="text-primary">पंडित</span> मिलना हुआ आसान।{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
