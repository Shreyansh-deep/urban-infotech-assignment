import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { IoExitOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";
import mandala1 from "../../assets/mandala_img2.png";
import mandala2 from "../../assets/mandala_img3.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";

const Services = ({ panditDetail }) => {
  const [services, setServices] = useState([]);
  const page = 1;
  const limit = 10;
  const search = ""
  const [selectedServices, setSelectedServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [serviceImages, setServiceImages] = useState({});
  const navigate = useNavigate();

  const fetchServiceImage = async (serviceId, presignedUrl) => {
    try {
      const response = await fetch(
        `test.backend.urbanoinfotech.com/api/v1/get-presigned-url?url=${encodeURIComponent(
          presignedUrl
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${panditDetail.results.access}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setServiceImages((prev) => ({ ...prev, [serviceId]: imageUrl }));
    } catch (error) {
      console.error("Error fetching service image:", error);
      toast.error("Failed to load service image");
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `https://test.backend.urbanoinfotech.com/api/v1/service?page=${page}&limit=${limit}&search=${encodeURIComponent(
            search
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${panditDetail.results.access}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setServices(responseData.results.data);

        // Fetch images for each service
        responseData.results.data.forEach((service) => {
          fetchServiceImage(service.id, service.image);
        });
      } catch (error) {
        toast.error("Error fetching pooja services: " + error.message);
      }
    };

    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[]);

  const handleServiceSelect = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleEdit = (serviceId) => {
    setEditingService(editingService === serviceId ? null : serviceId);
  };

  const handleInputChange = (serviceId, field, value) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, [field]: value } : service
      )
    );
  };

  return (
    <div className="px-5 relative">
      <img
        src={mandala1}
        alt=""
        className="absolute -top-10 right-0 -z-10 opacity-70"
      />
      <img src={mandala2} alt="" className="absolute left-0 -z-10 " />
      <Navbar children={<IoExitOutline size={40} className="text-white" />} />
      <div
        className="mt-5 ml-3 flex "
        onClick={() => navigate("/poojacategories")}
      >
        <FaArrowLeft size={30} />
      </div>
      <div className="flex justify-center -mt-5">
        <p className="lora font-semibold text-5xl">Service Select</p>
      </div>
      <div className="px-10 flex gap-5 mt-5 mb-5">
        <div className="flex items-center w-[500px] h-14 justify-between rounded-full border-2 border-lighestGray px-4 shadow-xl">
          <input
            type="text"
            placeholder="Search"
            className="w-[400px] py-2 border-transparent"
          />
          <HiMagnifyingGlass className="text-gray" size={20} />
        </div>
        <div className="flex items-center w-42 h-14 justify-between rounded-full border-2 border-lighestGray px-4 shadow-xl">
          <input
            type="text"
            placeholder="Add Filter"
            className="w-40 py-2 border-transparent"
          />
          <CiFilter className="" size={20} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {services &&
          services
            .map((item) => (
              <div
                key={item.id}
                className={`w-[454px] h-48 p-4 flex justify-center gap-5 rounded-2xl border-2 ${
                  selectedServices.includes(item.id)
                    ? "border-primary"
                    : "border-lighestGray"
                } items-center cursor-pointer`}
                onClick={() => handleServiceSelect(item.id)}
              >
                <div className="w-52 h-40 rounded-2xl">
                  {serviceImages[item.id] ? (
                    <img
                      src={serviceImages[item.id]}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-52 flex flex-col gap-1">
                    <p className="font-bold text-textPrimary">{item.name}</p>
                    <p className="text-lightGray">{item.name_local_lang}</p>
                  </div>
                  <div className="w-48 h-9 border border-lightGray rounded-lg flex items-center justify-center">
                    <input
                      type="text"
                      placeholder="Add hours"
                      disabled={editingService !== item.id}
                      value={item.hours || ""}
                      onChange={(e) =>
                        handleInputChange(item.id, "hours", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-48 h-9 border border-lightGray rounded-lg flex items-center justify-center">
                    <input
                      type="text"
                      placeholder="Add price"
                      disabled={editingService !== item.id}
                      value={item.price || ""}
                      onChange={(e) =>
                        handleInputChange(item.id, "price", e.target.value)
                      }
                    />
                  </div>
                  <div
                    className="flex gap-2 p-1 text-sm items-center justify-center w-14 h-4 text-primary border border-primary rounded-lg cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item.id);
                    }}
                  >
                    <BiEditAlt />
                    {editingService === item.id ? "Save" : "Edit"}
                  </div>
                </div>
              </div>
            ))
            .filter(Boolean)}
      </div>
      <div className="flex items-center justify-center mt-5">
        <button
          className="w-[538px] h-11 bg-primary flex items-center justify-center text-white text-xl rounded-xl mt-2 cursor-pointer"
          onClick={() => navigate("/confirmation")}
        >
          Add to my services
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Services;
