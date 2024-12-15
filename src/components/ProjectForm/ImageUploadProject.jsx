import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import apiClient from '../../apis/axios';

const ImageUploadProject = ({projectId, nextStep}) => {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    // No need to convert to URLs, directly add the Blob objects
    setImages(prevImages => [...prevImages, ...acceptedFiles]);
  };

  const handleRemove = (image) => {
    setImages(prevImages => prevImages.filter(item => item !== image));
  };

  const handleUpload = async () => {
    const formData = new FormData();
  
    for (let image of images) {
      try {
        // Compress the image
        const compressedFile = await imageCompression(image, {
          maxSizeMB: 1, // Maximum size of the image in MB
          maxWidthOrHeight: 800, // Maximum width/height
          useWebWorker: true, // Use Web Worker for better performance
        });
  
        // Preserve the original file name and extension
        const originalFileName = image.name; // Get the original file name
         // Extract the file extension
        const newFileName = `${Date.now()}_${originalFileName}`; // Optionally modify the filename
  
        // Append the compressed file with its original name and extension
        formData.append('images', new File([compressedFile], newFileName, { type: compressedFile.type }));
  
      } catch (error) {
        console.error('Error during image compression:', error);
      }
    }
  
    // Debugging the FormData
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Logs both the key and the file object
    }
  
    // Upload images
    try {
      const response = await apiClient.post(`/project/images/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log('Images uploaded successfully');
        nextStep(); // Move to the next step after successful upload
      } else {
        console.error('Error uploading images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',  // Accept only images
    multiple: true,     // Allow multiple files
  });

  return (
    <div className="w-full p-8">
      <div {...getRootProps()} className="border-dashed border-4 p-8 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag and drop images here, or click to select files</p>
      </div>

      <div className="mt-4 flex flex-wrap">
        {images.map((image, index) => (
          <div key={index} className="relative w-32 h-32 mr-4 mb-4">
            <img
              src={URL.createObjectURL(image)}  // Preview image directly from Blob
              alt={`Preview ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => handleRemove(image)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
       {images.length>=1 && <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Upload Images
        </button>}
      </div>
    </div>
  );
};

export default ImageUploadProject;
