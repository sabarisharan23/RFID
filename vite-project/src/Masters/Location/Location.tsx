import React from "react";
import { useNavigate } from "react-router-dom";

const Location: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard");
  };
  return (
    <div className="bg-gray-100 h-screen p-6">
      <h1 className="text-2xl font-semibold pb-6">Locations</h1>
      <div className="bg-white shadow-md rounded-md p-8 w-full">
        {/* Form Section */}
        <form className="grid grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label
              htmlFor="locationName"
              className="text-gray-700 font-medium mb-2"
            >
              Location Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="locationName"
              placeholder="Enter Location Name"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="locationDescription"
              className="text-gray-700 font-medium mb-2"
            >
              Location Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="locationDescription"
              placeholder="Enter Location Description"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </form>

        {/* Buttons Section */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            className="bg-[#00B894] hover:bg-[#009D80] text-white py-2 px-4 rounded"
            onClick={handleBack}
          >
            Back
          </button>
          <button className="bg-[#635bff] text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-200">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Location;
