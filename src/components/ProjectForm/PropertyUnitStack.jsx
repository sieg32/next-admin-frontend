import React, { useState } from "react";
import PropertyUnitForm from "./PropertyUnitForm"; // Ensure this is the correct path to your PropertyForm component
import apiClient from "../../apis/axios";

const PropertyUnitStack = ({projectId, nextStep}) => {
  const [propertyUnits, setPropertyUnits] = useState([]); // List of property units
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form visibility

  // Handle form submission
  const handleAddPropertyUnit = (data) => {
    setPropertyUnits((prevUnits) => [...prevUnits, data]); // Add new unit to the list
    setIsFormOpen(false); // Close the form
  };

  // Handle deleting a property unit
  const handleDeletePropertyUnit = (indexToDelete) => {
    setPropertyUnits((prevUnits) => prevUnits.filter((_, index) => index !== indexToDelete));
  };

  const handleUploadUnit = async () => {
    try {
      if (propertyUnits.length === 0) {
        alert("No property units to upload!");
        return;
      }
  
      // Making API calls for each property unit
      const responses = await Promise.all(
        propertyUnits.map((data) => 
          apiClient.post(`/project/propertyUnit/${projectId}`, data)
        )
      );
  
      // Success feedback
      console.log("All property units uploaded successfully:", responses);
      nextStep()
      alert("Property units uploaded successfully!");
  
      // Optional: Clear the local state after successful upload
      setPropertyUnits([]);
    } catch (error) {
      // Error feedback
      console.error("Error uploading property units:", error);
      alert("Failed to upload some property units. Please try again.");
    }
  };
  

  return (
    <div className="w-full p-6 space-y-4">
      <h1 className="text-2xl font-bold">Property Units</h1>

     

      {/* Render PropertyForm conditionally */}
      {isFormOpen && (
        <div className="p-4 border rounded-lg shadow bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Add New Property Unit</h2>
          <PropertyUnitForm onSubmit={handleAddPropertyUnit} />
        </div>
      )}

      {/* Display the list of property units */}
      <div className="space-y-4 mt-4 flex gap-4 items-center">
        {propertyUnits.length > 0 ? (
          propertyUnits.map((unit, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow bg-white space-y-2"
            >
              <h3 className="font-bold text-lg">Property Unit {index + 1}</h3>
              <ul className="text-sm space-y-1">
                {Object.entries(unit).map(([key, value]) => (
                  value && <li key={key}>
                    <span className="font-medium capitalize">{key}:</span> {" "}
                    {value.toString()}
                  </li>
                ))}
              </ul>
              <button
                className="px-3 py-1 mt-2 bg-red-500 text-white text-sm rounded shadow hover:bg-red-600"
                onClick={() => handleDeletePropertyUnit(index)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No property units added yet.</p>
        )}
      </div>

        <div className="w-full flex justify-between">
           {/* Button to add a new property unit */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        onClick={() => setIsFormOpen(true)}
      >
        Add Property Unit
      </button>

     {propertyUnits.length >= 1 && <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        onClick={() => {handleUploadUnit()} }
      >
        upload Property Unit
      </button>}
        </div>

    </div>
  );
};

export default PropertyUnitStack;
