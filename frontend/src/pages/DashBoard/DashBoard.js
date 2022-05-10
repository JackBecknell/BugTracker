import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

//component imports
import "./DashBoardStyless.css";
import NavBar from "../../components/NavBar/NavBar";
import AddProject from "../../components/AddProject/AddProject";

const DashBoard = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [projects, setProjects] = useState([]);
  const [requestReload, setRequestReload] = useState(true);
  const navigate = useNavigate();

  let reloadConditions = [token, requestReload];

  useEffect(() => {
    if (requestReload) {
      const fetchProjects = async () => {
        try {
          let response = await axios.get(
            "http://127.0.0.1:8000/api/projects/",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setProjects(response.data);
        } catch (error) {
          console.log(error.message);
        }
        setRequestReload(false);
      };
      fetchProjects();
    }
  }, [reloadConditions]);

  return (
    <div className="nav-projects-container">
      <NavBar />
      <div className="background-img">
        <div className="projects-container">
          <div className="phead">
            <div className="projects-head">
              <h3>PROJECTS</h3>
            </div>
            <AddProject reloadProject={setRequestReload} />
          </div>
          {projects &&
            projects.map((project, i) => (
              <Link
                onClick={() => props.setProjectId(project.id)}
                key={i}
                to={`/projectPage/${project.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="project-link">
                  <div className="project-link-head">
                    <div className="head-left">
                      <p>TITLE</p>
                      <h3>{project.title}</h3>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="head-mid">
                      <p>POSTED ON</p>
                      <h3>{project.date_created}</h3>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="head-right">
                      <p>USERNAME</p>
                      <h3>{project.project_author.username}</h3>
                    </div>
                  </div>
                  <div className="description-cuttoff">
                    <p>DESCRIPTION</p>
                    {project.description}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
