import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "./DashBoardStyless.css";
import NavBar from "../../components/NavBar/NavBar";

const DashBoard = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/projects/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProjects();
  }, [token]);

  return (
    <div className="nav-projects-container">
      <NavBar />
      <div className="projects-container">
        <div className="projects-head">
          <h3>PROJECTS</h3>
        </div>
        {projects &&
          projects.map((project, i) => (
            <Link
              key={i}
              to={`/projectPage/${project.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="project-link">
                <p>{project.title}</p>
                <p>{project.description}</p>
                <p>{project.project_author.username}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DashBoard;
