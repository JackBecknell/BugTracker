import { React, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import AddTicket from "../../components/AddTicket/AddTicket";
import EditProject from "../../components/EditProject/EditProject";
import DeleteProject from "../../components/DeleteProject/DeleteProject";
import "./ProjectStyles.css";

const ProjectPage = (props) => {
  //token is used for axios request
  const [user, token] = useAuth();
  //
  const [project, setProject] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  //!!!redundant useState below fixes error in reloading screen, will come back to troubleshoot later.!!!
  const [author, setAuthor] = useState([]);
  const { id } = useParams();

  const [requestReload, setRequestReload] = useState(true);

  let reloadConditions = [id, requestReload];

  //Every time a new project id is sent through parameters axios request is called.
  useEffect(() => {
    if (requestReload) {
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
        setRequestReload(false);
      };
      fetchProject();
      setRequestReload(false);
    }
  }, [reloadConditions]);

  let table;
  if (tickets.length) {
    table = (
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
              let completeStatus;
              if (ticket.is_completed !== true) {
                completeStatus = <td>Incomplete</td>;
              } else {
                completeStatus = <td>Complete</td>;
              }
              return (
                <tr key={i} className="table-row">
                  <td>{ticket.title}</td>
                  <td>{completeStatus}</td>
                  <td>{ticket.priority.title}</td>
                  <td>{ticket.date_time_created}</td>
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
    );
  } else {
    table = (
      <p>
        Oops...this project has no tickets. You can be the first to post one.
      </p>
    );
  }

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
                  <h3>{author}</h3>
                </div>
                <div className="info-box">
                  <p>STATUS</p>
                  <h3 className={projectStatus}>{projectStatus}</h3>
                </div>
                <div className="info-box">
                  <p>POSTED</p>
                  <h3>{project.date_created}</h3>
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
            />
          </div>
        )}
        {table}
      </div>
    </div>
  );
};

export default ProjectPage;
// to={`/ticketPage/${ticket.id}`}
