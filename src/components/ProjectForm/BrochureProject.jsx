import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import apiClient from '../../apis/axios';

const BrochureProject = ({projectId, nextStep}) => {
  const [brochure, setBrochure] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = (acceptedFiles, fileRejections) => {
    // Handle rejected files (e.g., wrong file type)
    if (fileRejections.length > 0) {
      setError('Only PDF files are allowed.');
      return;
    }

    const file = acceptedFiles[0]; // Get the first accepted file
    setBrochure(file);
    setError(null); // Clear any previous errors

    
  };



  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf', // Accept only PDF files
    multiple: false,           // Allow only one file
  });

  const handleRemove = () => {
    setBrochure(null);
    if (onUpload) {
      onUpload(null); // Notify parent that the file was removed
    }
  };

  const  handleUpload = async ()=>{
    const formData = new FormData;

    formData.append('brochure', brochure);

    try {
        const response =await apiClient.post(`/project/brochure/${projectId}`, formData, {
            headers:{
                "Content-Type":'multipart/form-data'
            }
        })
        if(response.status=== 200 ){
            console.log('brohcure uploaded successfully')
            nextStep()
        }
    } catch (error) {
        console.log('error uploading brochure', error)
    }
  }

  return (
    <div className="w-full p-4 border border-gray-300 rounded-lg">
      <div {...getRootProps()} className="border-dashed border-2 p-6 text-center cursor-pointer rounded-lg">
        <input {...getInputProps()} />
        {!brochure ? (
          <p className="text-gray-600">Drag and drop a PDF file here, or click to select a file</p>
        ) : (
          <p className="text-green-600">File ready: {brochure.name}</p>
        )}
      </div>

      {error && <p className="text-red-600 mt-2">{error}</p>}

     
      {brochure && (
        <div className="mt-4 flex justify-between">
          
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleRemove}
          >
            Remove
          </button>
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Upload brochure
        </button>
        </div>
        
      )}
      
    </div>
  );
};

export default BrochureProject;
