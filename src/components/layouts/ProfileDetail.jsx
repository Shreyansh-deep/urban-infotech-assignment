import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { IoExitOutline } from "react-icons/io5";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProfileDetail = ({ panditDetail }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleSave = async () => {
    const formData = {
      first_name: firstName,
      last_name: lastName,
      contact_number: contactNumber,
    };

    try {
      const response = await fetch(
        `https://test.backend.urbanoinfotech.com/api/v1/pandit/${panditDetail.results.data.user_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${panditDetail.results.access}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      toast(responseData.message);
      navigate("/poojacategories");
    } catch (error) {
      toast("Error saving profile:", error);
    }
  };

  return (
    <div className="px-5">
      <Navbar children={<IoExitOutline size={40} className="text-white" />} />
      <div className="mt-5 ml-3" onClick={() => navigate("")}>
        <FaArrowLeft size={30} />
      </div>
      <div className="w-full flex flex-col gap-5 items-center ">
        <p className="lora font-semibold text-5xl">Profile Details</p>
        <label className="flex text-textPrimary font-medium gap-5 text-xl items-center mt-5">
          Upload Image
          <FaPen size={20} className="cursor-pointer" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        {imageUrl && (
          <div className="w-40 h-44 rounded-full shadow-2xl border border-gray border-opacity-20 overflow-hidden">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <label className="flex flex-col text-2xl text-textPrimary gap-2 font-medium">
          First Name
          <input
            type="text"
            className="w-158 h-14 border-2 border-gray rounded-xl pl-5"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="flex flex-col text-2xl text-textPrimary gap-2 font-medium">
          Last Name
          <input
            type="text"
            className="w-158 h-14 border-2 border-gray rounded-xl pl-5"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="flex flex-col text-2xl text-textPrimary gap-2 font-medium">
          Contact Number
          <input
            type="text"
            className="w-158 h-14 border-2 border-gray rounded-xl pl-5"
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </label>
        <button
          className="w-158 h-11 bg-primary flex items-center justify-center text-white text-xl rounded-xl mt-2 cursor-pointer"
          onClick={handleSave}
        >
          Save
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProfileDetail;
