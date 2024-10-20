import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import mandala1 from "../../assets/mandala_img2.png";
import mandala2 from "../../assets/mandala_img3.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PoojaCategories = ({ panditDetail }) => {
  const [categories, setCategories] = useState([]);
  const page = 1;
  const limit = 10;
  const search = "";
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryImages, setCategoryImages] = useState({});
  const navigate = useNavigate();

  const fetchCategoryImage = async (categoryId, presignedUrl) => {
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
      setCategoryImages((prev) => ({ ...prev, [categoryId]: imageUrl }));
    } catch (error) {
      console.error("Error fetching category image:", error);
      toast.error("Failed to load category image");
    }
  };

  useEffect(() => {
    const fetchPoojaCategories = async () => {
      try {
        const response = await fetch(
          `https://test.backend.urbanoinfotech.com/api/v1/category?page=${page}&limit=${limit}&search=${encodeURIComponent(
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
        setCategories(responseData.results.data);

        // Fetch images for each category
        responseData.results.data.forEach((category) => {
          fetchCategoryImage(category.id, category.image);
        });
      } catch (error) {
        toast.error("Error fetching pooja categories: " + error.message);
      }
    };

    fetchPoojaCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[]);


  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
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
      <div className="w-full flex justify-center my-10">
        <p className="lora font-semibold text-5xl">Categories of Pooja</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {categories &&
          categories.map((category) => (
            <div
              key={category.id}
              className={`w-[454px] h-48 p-4 flex justify-center gap-5 rounded-2xl border-2 ${
                selectedCategory === category.id
                  ? "border-primary"
                  : "border-lighestGray"
              } items-center cursor-pointer`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="w-52 h-40 rounded-2xl">
                {categoryImages[category.id] ? (
                  <img
                    src={categoryImages[category.id]}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                    Loading...
                  </div>
                )}
              </div>
              <div className="w-52 flex flex-col gap-5">
                <p className="font-bold text-textPrimary">
                  {category.name}{" "}
                  <span className="text-lightGray">
                    ({category.local_name})
                  </span>
                </p>
                <p className="text-sm">{category.description}</p>
              </div>
            </div>
          ))}
      </div>
      {/* <div className="flex justify-between mt-5">
        <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div> */}
      <div className="flex items-center justify-center">
        <button
          className="w-[538px] h-11 bg-primary flex items-center justify-center text-white text-xl rounded-xl mt-2 cursor-pointer"
          onClick={() => navigate("/services")}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PoojaCategories;
