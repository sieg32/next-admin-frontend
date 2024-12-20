import {useEffect, useState} from "react";
import apiClient from "../apis/axios";
import { useNavigate} from "react-router-dom";
import noImg from "./../assets/noImg.png";

const HomePage = () => {
  const [projectData, setProjectData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [navActive, setNavActive] = useState(localStorage.getItem("navActive") || "Project");
  const [searchValue, setSearchValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();
  const filterList = projectData?.filter((data) => data.type === navActive.toLowerCase());
  const handleLogout = () => {
    const isConfirm = confirm("Are you sure you want to logout?");
    if (isConfirm) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    if (deleteId) {
      const deleteProject = projectData.find((data) => data.project_id === deleteId);
      console.log(deleteProject);
      const isDeleteTrue = confirm(`🚫 Are you sure to delete this ${deleteProject.type}:- ${deleteProject.name}?`);
      if (isDeleteTrue) {
        setFilteredData((prev) => prev.filter((data) => data.project_id !== deleteId));
        const deleteProject = async () => {
          await apiClient.delete(`/project/${deleteId}`);
          fetchProjects();
        };
        deleteProject();
      } else {
        setDeleteId(null);
      }
    }
  }, [deleteId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filterList = projectData.filter((data) => data.type === navActive.toLowerCase() && data.name.toLowerCase().includes(searchValue));
    setFilteredData(filterList);
    console.log(filterList);
  };

  const fetchProjects = async () => {
    const response = await apiClient.get("/project");
    setProjectData(response.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredData(filterList);
  }, [navActive, projectData]);

  useEffect(() => {
    localStorage.setItem("navActive", navActive);
  }, [navActive]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div></div>
          <form onSubmit={(e) => handleSearch(e)} className="space-x-2">
            <input
              onChange={(e) => {
                {
                  setSearchValue(e.target.value.toLowerCase());
                  if (e.target.value == 0) {
                    setFilteredData(projectData.filter((data) => data.type === navActive.toLowerCase()));
                    return;
                  }
                }
              }}
              type="text"
              placeholder="Search by name"
              name=""
              id=""
              value={searchValue}
              className="border-2 px-2 rounded-md"
            />
            <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded-md">
              Search
            </button>
          </form>
          <button onClick={handleLogout} className="px-4 py-1 bg-red-500 text-white rounded-md">
            Logout
          </button>
        </div>
        <div className="flex justify-between mt-4 items-center">
          <div className="flex gap-4">
            <div
              onClick={() => {
                setNavActive("Project");
                setSearchValue("");
              }}
              className={`${navActive === "Project" && "bg-blue-400"} px-2 rounded-md cursor-pointer`}
            >
              Projects
            </div>
            <div
              onClick={() => {
                setNavActive("Land");
                setSearchValue("");
              }}
              className={`${navActive === "Land" && "bg-blue-400"} px-2 rounded-md cursor-pointer`}
            >
              Lands
            </div>
            <div
              onClick={() => {
                setNavActive("Hotel");
                setSearchValue("");
              }}
              className={`${navActive === "Hotel" && "bg-blue-400"} px-2 rounded-md cursor-pointer`}
            >
              Hotels
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className="px-2 py-1 rounded-lg bg-blue-200 cursor-pointer"
              onClick={() => {
                navigate("/deals/upload");
              }}
            >
              Upload project
            </div>
          </div>
        </div>
        <div className=" relative grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-4">
          {filteredData?.length > 0 ? (
            filteredData?.map((data) => {
              return <ProjectBox key={data.project_id} id={data.project_id} {...data} setDeleteId={setDeleteId} />;
            })
          ) : (
            <div className="text-center w-full h-full mt-20 absolute">No data found</div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectBox = ({id, name, type, slug, description, is_public, images, setDeleteId}) => {
 
  return (
    <>
      <div key={id} className="relative border p-1 md:p-3 rounded shadow-sm hover:shadow-lg">
        <div className={`absolute right-0 top-0 rounded-xl p-2 ${is_public ? 'bg-green-400' :'bg-gray-200' }`}>{is_public? 'public' : 'draft'}</div>
        <div className=" h-40 lg:h-60 w-full bg-gray-200 rounded-lg mb-2 overflow-hidden">
          <a  href={`https://deals.nextopson.in/${type}/details/${slug}`}>

          <img src={images[0]?.image_url || noImg} alt="" className="w-full h-full object-cover  " />
          </a>
        </div>
        <h2 className="text-lg font-bold">{name}</h2>
        <h3>Type - {type.toUpperCase()}</h3>
        <div className="flex justify-between mt-1">
          <button className="px-4 py-1 bg-blue-500 rounded-2xl cursor-pointer hover:bg-blue-400 text-white">Edit</button>
          <button onClick={() => setDeleteId(id)} className="px-4 py-1 bg-red-400 rounded-2xl cursor-pointer hover:bg-red-300 text-white">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
