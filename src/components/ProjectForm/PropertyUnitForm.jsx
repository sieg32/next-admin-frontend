import React from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../apis/axios";

const PropertyUnitForm = ({  onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    // Loop through all keys in the data object
    Object.keys(data).forEach(key => {
      if (data[key] === '') {
        data[key] = null; // Replace empty string with null
      }
    });
  
    // Submit the form with the updated data
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Property Type</label>
        <input
          type="text"
          {...register("property_type", {required:'property type is required'})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.property_type && <span className="text-red-500 text-sm">Property type is required.</span>}
      </div>

      {/* Bedroom Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Bedroom Count</label>
        <input
          type="number"
          {...register("bedroom_count", )}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.bedroom_count && <span className="text-red-500 text-sm">Bedroom count is required and must be at least 1.</span>}
      </div>

      {/* Bathroom Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Bathroom Count</label>
        <input
          type="number"
          {...register("bathroom_count")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.bathroom_count && <span className="text-red-500 text-sm">Bathroom count is required and must be at least 1.</span>}
      </div>

      {/* Parking */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Parking</label>
        <select
          {...register("parking", )}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >  
            <option value="">N/A</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.parking && <span className="text-red-500 text-sm">Parking is required.</span>}
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Area</label>
        <input
          type="number"
          {...register("area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.area && <span className="text-red-500 text-sm">Area is required.</span>}
      </div>

      {/* Super Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Super Area</label>
        <input
          type="number"
          {...register("super_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Area Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Area</label>
          <input
            type="number"
            {...register("areaMin")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Area</label>
          <input
            type="number"
            {...register("areaMax")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Floor Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Floor Number</label>
        <input
          type="number"
          {...register("floor_number")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Facing Direction */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Facing Direction</label>
        <input
          {...register("facing_direction")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
         
        </input>
      </div>

      {/* Balcony Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Balcony Count</label>
        <input
          type="number"
          {...register("balcony_count")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Construction Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Construction Status</label>
        <input
          type="text"
          {...register("construction_status")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Construction Year */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Construction Year</label>
        <input
          type="text"
          {...register("construction_year")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Availability Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Availability Status</label>
        <input
          type="text"
          {...register("availability_status")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="text"
          {...register("price")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Additional Features */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Features</label>
        <textarea
          {...register("additional_features")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default PropertyUnitForm;
