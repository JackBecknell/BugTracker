import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import DeleteProjectModal from "../../components/DeleteProject/DeleteProjectModal";
import EditProjectModal from "../../components/EditProject/EditProjectModal";
import DeleteModal from "../../components/DeleteTicket/DeleteModal";
import EditModel from "../../components/EditTicket/EditModal";
import "./AdminStyles.css";

const AdminPage = (props) => {
  //Below are all useState variable controlling modals
  const [editProjectModalStatus, setEditProjectModalStatus] = useState(false);
  const [deleteProjectModalStatus, setDeleteProjectModalStatus] =
    useState(false);
  const [editTicketModalStatus, setEditTicketModalStatus] = useState(false);
  const [deleteTicketModalStatus, setDeleteTicketModalStatus] = useState(false);

  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([
    "TEST DATA TEST DATA",
    "TEST DATA TEST DATA",
    "TEST DATA TEST DATA",
    "TEST DATA TEST DATA",
    "TEST DATA TEST DATA",
    "TEST DATA TEST DATA",
    "TEST DATA TEST DATA",
    "TEST DATA TEST DATA",
  ]);
  const [requestReload, setRequestReload] = useState(true);
  const [user, token] = useAuth();

  let projectsConfirimation;
  if (projects.length >= 1) {
    projectsConfirimation = true;
  } else {
    projectsConfirimation = false;
  }

  let ticketsConfirimation;
  if (tickets.length >= 1) {
    ticketsConfirimation = true;
  } else {
    ticketsConfirimation = false;
  }

  let usersConfirimation;
  if (projects.length >= 1) {
    ticketsConfirimation = true;
  } else {
    ticketsConfirimation = false;
  }

  //http://127.0.0.1:8000/api/tickets/
  useEffect(() => {
    const fetchProjects = async () => {
      let projectResponse;
      let ticketsResponse;
      try {
        projectResponse = await axios.get(
          "http://127.0.0.1:8000/api/projects/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setProjects(projectResponse.data);
      } catch (error) {
        console.log(error.message);
      }
      try {
        ticketsResponse = await axios.get(
          "http://127.0.0.1:8000/api/tickets/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setTickets(ticketsResponse.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProjects();
  }, [requestReload]);

  return (
    <div className="admin-page-container">
      <NavBar />
      <div className="column">
        <h3>PROJECTS</h3>
        <form>
          <input type="text"></input>
          <button className="submit" type="submit">
            SUBMIT
          </button>
        </form>
        {projectsConfirimation &&
          projects.map((project, i) => (
            <div className="project-box">
              <div className="buttons">
                <button className="delete">X</button>
                {deleteProjectModalStatus && (
                  <DeleteProjectModal
                    project={project}
                    setModalStatus={setDeleteProjectModalStatus}
                  />
                )}
                <button className="edit">EDIT</button>
                {editProjectModalStatus && (
                  <EditProjectModal
                    project={project}
                    // You left off here, you ran into the problem that bothe edit modals and
                    //delete modales are only situated for project page and inspect ticket page
                    //you need to pass down information to inform the modals where you are using them
                    //from and conditionally make each perform the right action.
                  />
                )}
              </div>
              <div>
                <h4>{project.title}</h4>
                {project.is_completed === true ? (
                  <p>COMPLETED</p>
                ) : (
                  <p>INCOMPLETE</p>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="column">
        <h3>TICKETS</h3>
        <form>
          <input type="text"></input>
          <button className="submit" type="submit">
            SUBMIT
          </button>
        </form>
        {ticketsConfirimation &&
          tickets.map((ticket, i) => (
            <div className="ticket-container">
              <div className="buttons">
                <button className="delete">X</button>
                <button className="edit">EDIT</button>
              </div>
              <div className="ticket-info-box">
                <h4>{ticket.title}</h4>
                {ticket.is_completed === true ? (
                  <p>COMPLETED</p>
                ) : (
                  <p>INCOMPLETE</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminPage;
