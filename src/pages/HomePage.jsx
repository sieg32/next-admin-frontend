import React, { useEffect, useState } from "react";
import apiClient from "../apis/axios";
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [projectData, setProjectData] = useState([]);

  
  const fetchProjects = async ()=>{
    const response = await  apiClient.get('/project');
   
    setProjectData(response.data);

  }

  useEffect(()=>{
    fetchProjects()
  },[])

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="p-4">

        <h1 className="text-2xl font-bold text-gray-800">projects</h1>
        <div className="flex justify-end">
        <div className="p-8 rounded-lg bg-gray-200 cursor-pointer" onClick={()=>{navigate('/deals/upload')}}>Upload project</div>

        </div>
        <div className="grid gap-4 grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-4">
          {
            projectData && projectData.map((data)=>{
              return  <ProjectBox id={data.project_id} {...data} />
            })
          }
        </div>
      </div>
    </div>
  );
};



const ProjectBox = ({ name,type, description, images }) => {
  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-lg">
      <div>
        <img src={images[0]?.image_url}></img>
      </div>
      <h2 className="text-lg font-bold">{name}</h2>
      <h3>Type - {type}</h3>
      <span className={`text-xs px-2 py-1 rounded bg-${type}-100 text-${type}-600`}>
        {type.toUpperCase()}
      </span>
    </div>
  );
};




export default HomePage;
