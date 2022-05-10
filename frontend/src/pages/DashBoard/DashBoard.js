import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

//component imports
import "./DashBoardStyless.css";
import NavBar from "../../components/NavBar/NavBar";
import AddProject from "../../components/AddProject/AddProject";
import FilterProjects from "../../components/FilterProjects/FilterProjects";

const DashBoard = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [projects, setProjects] = useState([]);
  const [dateSwitchText, setDateSwitchText] = useState("");
  const [requestReload, setRequestReload] = useState(true);
  const navigate = useNavigate();

  let reloadConditions = [token, requestReload];

  function handleProjectsMap() {
    let newProjects = projects.reverse();
    setProjects(newProjects);
    if (dateSwitchText === "VIEW BY NEWEST") {
      setDateSwitchText("VIEW BY OLDEST");
    } else if (dateSwitchText === "VIEW BY OLDEST") {
      setDateSwitchText("VIEW BY NEWEST");
    }
  }

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
          setDateSwitchText("VIEW BY NEWEST");
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
          <div className="phead-filter">
            <div className="phead">
              <div className="projects-head">
                <h3>PROJECTS</h3>
              </div>

              <AddProject reloadProject={setRequestReload} />
            </div>

            {projects && (
              <div className="fltr-dateswitch">
                <FilterProjects
                  reloadProjects={setRequestReload}
                  projects={projects}
                  setProjects={setProjects}
                />
                <button onClick={handleProjectsMap}>{dateSwitchText}</button>
              </div>
            )}
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
                      <p>AUTHOR</p>
                      <h3>{project.project_author.username}</h3>
                    </div>
                  </div>
                  {project.is_completed && (
                    <div className="completed-project">
                      <p>PROJECT COMPLETED</p>
                    </div>
                  )}
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
