//third party imports
import { React, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

//my components
import NavBar from "../../components/NavBar/NavBar";
import AddTicket from "../../components/AddTicket/AddTicket";
import EditProject from "../../components/EditProject/EditProject";
import DeleteProject from "../../components/DeleteProject/DeleteProject";
import "./ProjectStyles.css";

const ProjectPage = (props) => {
  const [user, token] = useAuth();

  //axios return for project by id is stored here
  const [project, setProject] = useState([]);

  //axios request for tickets by project id is stored here
  const [tickets, setTickets] = useState([]);

  //projectStatus is used for both displaying text in place of a boolean field as well
  //as styling that text
  const [projectStatus, setProjectStatus] = useState([]);
  const [author, setAuthor] = useState([]);
  const { id } = useParams();

  //useState requestReload is changed everytime the data needs to refresh
  const [requestReload, setRequestReload] = useState(true);

  //On change of id in params this useEffect triggers the one below
  useEffect(() => {
    setRequestReload(!requestReload);
  }, [id]);

  useEffect(() => {
    const fetchProject = async () => {
      let projectResponse;
      let ticketsResponse;
      try {
        projectResponse = await axios.get(
          `http://127.0.0.1:8000/api/projects/${id}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (error) {
        console.log(error.message);
      }
      try {
        ticketsResponse = await axios.get(
          `http://127.0.0.1:8000/api/tickets/list/${id}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (error) {
        console.log(error.message);
      }
      if (projectResponse.data.is_completed === true) {
        setProjectStatus("Completed");
      } else {
        setProjectStatus("Incomplete");
      }
      setTickets(ticketsResponse.data);
      setAuthor(projectResponse.data.project_author.username);
      setProject(projectResponse.data);
    };
    fetchProject();
  }, [requestReload]);

  return (
    <div className="nav-project-tickets-container">
      <NavBar />
      <div className="project-container">
        <div>
          {project.id && (
            <div>
              <div className="project-head">
                <h3>PROJECT : {project.title} </h3>
              </div>
              {user.id === project.project_author.id ? (
                <div className="edit-delete-container">
                  <div>
                    <EditProject
                      project={project}
                      reloadProject={setRequestReload}
                      reloadCondition={requestReload}
                    />
                  </div>
                  <div className="del-Container">
                    <DeleteProject project={project} />
                  </div>
                </div>
              ) : (
                <div className="not-author-space"></div>
              )}
            </div>
          )}
        </div>
        {project.id && (
          <div className="full-width-container">
            <div className="project-info-container">
              <div className="project-auth-status-date-box">
                <div className="author-info-box">
                  <p>AUTHOR</p>
                  <h2>{author}</h2>
                </div>
                <div className="info-box">
                  <p>STATUS</p>
                  <h2 className={projectStatus}>{projectStatus}</h2>
                </div>
                <div className="info-box">
                  <p>POSTED</p>
                  <h2>{project.date_created}</h2>
                </div>
              </div>
              <div className="project-description-box">
                <p>DESCRIPTION</p>
                <h3>{project.description}</h3>
              </div>
            </div>
            <AddTicket
              projectId={project.id}
              reloadProject={setRequestReload}
              reloadCondition={requestReload}
            />
          </div>
        )}
        {tickets.length >= 1 ? (
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket Name</th>
                <th>Status</th>
                <th>Priority</th>
                <th>DatePosted</th>
                <th>Author</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((ticket, i) => {
                  return (
                    <tr key={i} className="table-row">
                      <td>{ticket.title}</td>
                      {ticket.is_completed ? (
                        <td className="status">Complete</td>
                      ) : (
                        <td className="status">Incomplete</td>
                      )}
                      <td>{ticket.priority.title}</td>
                      <td>{ticket.date_created}</td>
                      <td>{ticket.author.username}</td>
                      <Link
                        key={i}
                        to={`/inspectTicket/${ticket.id}/Projects.jsx`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div className="ticket-view-btn">
                          <h3>VIEW</h3>
                        </div>
                      </Link>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div className="ticket-table">
            <p>
              This project has no tickets. You can be the first to post one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
