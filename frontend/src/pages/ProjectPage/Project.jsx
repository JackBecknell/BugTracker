import { React, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import AddTicket from "../../components/AddTicket/AddTicket";
import "./ProjectStyles.css";

const ProjectPage = (props) => {
  //token is used for axios request
  const [user, token] = useAuth();
  //
  const [project, setProject] = useState([]);
  const [tickets, setTickets] = useState([]);
  //!!!redundant useState below fixes error in reloading screen, will come back to troubleshoot later.!!!
  const [author, setAuthor] = useState([]);
  const { id } = useParams();

  //Every time a new project id is sent through parameters axios request is called.
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
      setTickets(ticketsResponse.data);
      setAuthor(projectResponse.data.project_author.username);
      setProject(projectResponse.data);
    };
    fetchProject();
  }, [id]);

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
                    to={`/inspectTicket/${ticket.id}`}
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
        <div className="project-head">
          {project.id && (
            <div>
              <h3>PROJECT : {project.title} </h3>
            </div>
          )}
        </div>
        {project.id && (
          <div>
            <div className="project-info-container">
              <p>author</p>
              <h3>{author}</h3>
              <p>posted</p>
              <h3>{project.date_created}</h3>
              <p>description</p>
              <h3>{project.description}</h3>
            </div>
            <AddTicket projectId={project.id} />
          </div>
        )}
        {table}
      </div>
    </div>
  );
};

export default ProjectPage;
// to={`/ticketPage/${ticket.id}`}
