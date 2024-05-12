import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import SearchBar from "../../../utils/Tools/SearchBar";
import Button from "../../../utils/Buttons/Button";
import RepositoryCard from "../../../utils/Cards/RespositoryCard";

const Repositories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/projects`
      );
      setProjects(response.data);
      setFilteredProjects(response.data); // Initially, all projects are shown
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = (search) => {
    setSearchTerm(search);
    if (search.trim()) {
      const filtered = projects.filter((project) =>
        project.project_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects); // If search is empty, display all projects
    }
  };

  return (
    <div className="text-black">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Repositories</h1>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <hr />
      <div>
        <div className="mt-4">
          <Button
            text="Create Project"
            onClick={() => navigate("/userDashboard/createProject")}
          />
        </div>
        <div>
          {filteredProjects.map((project) => (
            <RepositoryCard
              key={project._id}
              projectName={project.project_name}
              lastUpdated={project.last_modified}
              numCollaborators={project.collaborators?.length || 0}
              creationDate={project.creation_date}
              onClick={() =>
                navigate(`/userDashboard/projectDetails/${project._id}`, {
                  state: { project: project },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Repositories;
