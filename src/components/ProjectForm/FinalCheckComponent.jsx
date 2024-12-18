
import React, { useEffect, useState } from 'react';
import apiClient from '../../apis/axios';
import { useNavigate } from 'react-router-dom';

const FinalCheckComponent = ({ projectId, projectType }) => {

  const navigate = useNavigate()
  const [projectData, setProjectData] = useState(null); // State to store project data
  const [validationErrors, setValidationErrors] = useState([]); // State to store validation errors
  const [isMakingPublic, setIsMakingPublic] = useState(false); // State for button loading

  // Fetch the full project data from the API
  const fetchProjectData = async () => {
    try {
      const response = await apiClient.get(`/project/detail/${projectId}`);
      setProjectData(response.data.data);
      validateProject(response.data.data); // Validate the project on fetch
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  // Validate the project data for completeness
  const validateProject = (data) => {
    const errors = [];

    // Example validations (add more as needed)
    if (!data.name || data.name.trim() === '') errors.push('Project name is missing.');
    if (!data.description || data.description.trim() === '') errors.push('Project description is missing.');
    if ( projectType !== 'land'  && (!data.amenities || data.amenities.length === 0)) errors.push('Amenities are not selected.');
    if (!data.images || data.images.length === 0) errors.push('No project images uploaded.');
    if (projectType === 'project' && !data.brochure) errors.push('Project brochure is missing.');
    if (projectType === 'project' && !data.units) errors.push('property units is missing.');

    setValidationErrors(errors);
  };

  // Handle making the project public
  const handleMakePublic = async () => {
    if (validationErrors.length > 0) {
      alert('Please fix all validation errors before making the project public.');
      return;
    }

    setIsMakingPublic(true);
    try {
      const response = await apiClient.post(`/project/visibility/${projectId}`, {visibility:true});
      alert('Project has been successfully made public!');
      navigate('/home');
    } catch (error) {
      console.error('Error making project public:', error);
      alert('Failed to make the project public. Please try again.');
    } finally {
      setIsMakingPublic(false);
    }
  };

  // Fetch project data on component mount
  useEffect(() => {
    if (projectId) fetchProjectData();
  }, [projectId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Final Check</h2>

      {/* Loading State */}
      {!projectData && <p>Loading project data...</p>}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-4 p-4 border border-red-500 bg-red-100 rounded">
          <h3 className="font-semibold text-red-600">Validation Errors:</h3>
          <ul className="list-disc pl-5 text-red-600">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Project Data Overview */}
      {projectData && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Project Details:</h3>
          <p><strong>Name:</strong> {projectData.name || 'N/A'}</p>
          <p><strong>Description:</strong> {projectData.description || 'N/A'}</p>
          <p><strong>Amenities:</strong> {projectData.amenities?.length || 0} selected</p>
          <p><strong>Images:</strong> {projectData.images?.length || 0} uploaded</p>
          <p><strong>Brochure:</strong> {projectData.brochure ? 'Uploaded' : 'Not uploaded'}</p>
        </div>
      )}

      {/* Make Public Button */}
      <button
        onClick={handleMakePublic}
        className={`px-4 py-2 font-semibold text-white rounded ${
          isMakingPublic
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isMakingPublic}
      >
        {isMakingPublic ? 'Making Public...' : 'Make Project Public'}
      </button>
    </div>
  );
};

export default FinalCheckComponent;
