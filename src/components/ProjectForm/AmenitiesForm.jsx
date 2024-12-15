import React, { useEffect, useState } from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import apiClient from '../../apis/axios';

const AmenitiesForm = ({projectId, nextStep}) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]); 
  const [amenities, setAmenities] = useState([]); // State to store fetched amenities

  // Function to fetch amenities list from the API
  const fetchAmenityList = async () => {
    try {
      const response = await apiClient.get('/project/amenities');
      if (response.data) {
        // Map amenities data to the format required by DualListBox
        const formattedAmenities = response.data.data.map((amenity) => ({
          value: amenity.amenity_id,
          label: amenity.amenity_id,
        }));
        setAmenities(formattedAmenities);
      }
    } catch (error) {
      console.error('Error fetching amenities:', error);
    }
  };

  // Fetch amenities when the component mounts
  useEffect(() => {
    fetchAmenityList();
  }, []);
console.log(amenities)
  // Handle changes in selected amenities
  const onChange = (value) => {
    setSelectedAmenities(value);
  };


  const handleSubmit=async()=>{
    try {
      console.log(selectedAmenities)
      const response = apiClient.post(`/project/amenities/${projectId}`,{amenities:selectedAmenities} )
      console.log(response.data)
      nextStep()
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Amenity Selector</h2>
      {/* Render DualListBox only if amenities are loaded */}
      {amenities.length > 0 ? (
        <DualListBox
          className="h-fit"
          options={amenities} // Options to display in the dual list box
          selected={selectedAmenities} // Currently selected values
          onChange={onChange} // Callback for selection changes
          canFilter // Enables filtering
          filterCallback={(option, filter) =>
            option.label.toLowerCase().includes(filter.toLowerCase())
          } // Custom filtering logic
          filterPlaceholder="Search amenities..." // Placeholder for the filter input
        />
      ) : (
        <p>Loading amenities...</p> // Show a loading message while fetching amenities
      )}
       <div className="mt-4 flex justify-end">
       {selectedAmenities.length>=1 && <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          submit
        </button>}
      </div>
    </div>
   
  );
};

export default AmenitiesForm;
