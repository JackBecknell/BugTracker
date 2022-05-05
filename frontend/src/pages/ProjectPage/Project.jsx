import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./ProjectStyles.css";

const ProjectPage = (props) => {
  //currently un-used VVV
  const navigate = useNavigate();
  //token is used for axios request
  const [user, token] = useAuth();
  //
  const [project, setProject] = useState([]);
  const { id } = useParams();

  //Every time a new project id is sent through parameters axios request is called.
  useEffect(() => {
    const fetchProject = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/projects/${id}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setProject(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProject();
  }, [id]);
  return (
    <div className="nav-project-tickets-container">
      <NavBar />
      <div className="project-container">
        <div className="project-head">
          <div>
            <h3>PROJECT : {project.title} </h3>
          </div>
        </div>
        <p>project details</p>
        <p>project tickets</p>
      </div>
    </div>
  );
};

export default ProjectPage;
