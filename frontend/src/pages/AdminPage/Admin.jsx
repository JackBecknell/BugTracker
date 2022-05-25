import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import DeleteProjectModal from "../../components/DeleteProject/DeleteProjectModal";
import EditProjectModal from "../../components/EditProject/EditProjectModal";
import DeleteModal from "../../components/DeleteTicket/DeleteModal";
import EditModel from "../../components/EditTicket/EditModal";
import AdminUserAuthModal from "../../components/AdminUserAuthModal/AdminUserAuthModal";
import "./AdminStyles.css";

const AdminPage = (props) => {
  //Below are all useState variable controlling modals
  const [editUserAuthModal, setEditUserAuthModal] = useState(false);
  const [editProjectModalStatus, setEditProjectModalStatus] = useState(false);
  const [deleteProjectModalStatus, setDeleteProjectModalStatus] =
    useState(false);
  const [editTicketModalStatus, setEditTicketModalStatus] = useState(false);
  const [deleteTicketModalStatus, setDeleteTicketModalStatus] = useState(false);

  //useStates hold all data for all columns
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  //requestReload is switched to !requestReload to trigger  axios requests for all data
  const [requestReload, setRequestReload] = useState(true);
  const [user, token] = useAuth();

  //first useState contains current project/ticket to be edited, the second project/ticket to be deleted
  const [editValue, setEditValue] = useState([]);
  const [deleteValue, setDeleteValue] = useState([]);

  //values from projects/tickets/Users search bars.
  const [projectsUserInput, setProjectsUserInput] = useState("");
  const [ticketsUserInput, setTicketsUserInput] = useState("");
  const [usersUserInput, setUsersUserInput] = useState("");

  //function ensures projects and tickets contain value before
  //return statment tries to map.
  function confirmRender(requestData) {
    if (requestData.length >= 1) {
      return true;
    } else {
      return false;
    }
  }
  let projectsConfirmation = confirmRender(projects);
  let ticketsConfirmation = confirmRender(tickets);
  let usersConfirmation = confirmRender(users);

  //VVV ONLY IF WE FIGURE OUT EDITING FOR USERS
  // let usersConfirimation = confirmRender(projects)

  useEffect(() => {
    const fetchProjects = async () => {
      let projectResponse;
      let ticketsResponse;
      let usersResponse;
      setProjectsUserInput("");
      setTicketsUserInput("");
      setUsersUserInput("");
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
      try {
        usersResponse = await axios.get("http://127.0.0.1:8000/api/auth/all/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setUsers(usersResponse.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProjects();
  }, [requestReload]);

  function handleDeleteClick(value, modalDef) {
    setDeleteValue(value);
    if (modalDef === "projects") {
      setDeleteProjectModalStatus(true);
    } else if (modalDef === "tickets") {
      setDeleteTicketModalStatus(true);
    }
  }

  function handleEditClick(value, modalDef) {
    setEditValue(value);
    if (modalDef === "projects") {
      setEditProjectModalStatus(true);
    } else if (modalDef === "tickets") {
      setEditTicketModalStatus(true);
    } else if (modalDef === "users") {
      setEditUserAuthModal(true);
    }
  }

  function searchAndSet(values, userInput, type) {
    let returnArray = [];
    let checkBy;
    if (type === "users") {
      checkBy = "username";
    } else {
      checkBy = "title";
    }
    for (const [key, value] of Object.entries(values)) {
      let dbValue = value[checkBy].toLowerCase();
      let inputCheck = userInput.toLowerCase();
      if (dbValue.includes(inputCheck)) {
        returnArray.push(value);
      }
    }
    if (returnArray.length >= 1) {
      if (type === "projects") {
        setProjects(returnArray);
      } else if (type === "tickets") {
        setTickets(returnArray);
      } else if (type === "users") {
        setUsers(returnArray);
      }
    } else {
      alert(
        `Sorry, None of our ${type} have a title that contains ${userInput}`
      );
    }
  }

  function handleProjectsSubmit(event) {
    event.preventDefault();
    searchAndSet(projects, projectsUserInput, "projects");
  }

  function handleTicketsSubmit(event) {
    event.preventDefault();
    searchAndSet(tickets, ticketsUserInput, "tickets");
  }

  function handleUsersSubmit(event) {
    event.preventDefault();
    searchAndSet(users, usersUserInput, "users");
  }
  return (
    <div className="admin-page-container">
      <NavBar />
      <div className="reset-queries-container">
        <button onClick={() => setRequestReload(!requestReload)}>
          RESET
          <br />
          QUERIES
        </button>
      </div>

      <div className="column">
        <h3>PROJECTS</h3>
        <form onSubmit={handleProjectsSubmit}>
          <input
            type="text"
            placeholder="Search projects by title..."
            value={projectsUserInput}
            onChange={(event) => setProjectsUserInput(event.target.value)}
          ></input>
          <button className="submit" type="submit">
            SUBMIT
          </button>
        </form>
        {projectsConfirmation &&
          projects.map((project, i) => (
            <div className="project-box">
              <div className="buttons">
                <button
                  className="delete"
                  type="button"
                  key={i}
                  onClick={() => handleDeleteClick(project, "projects")}
                >
                  X
                </button>
                {deleteProjectModalStatus && (
                  <DeleteProjectModal
                    project={deleteValue}
                    setModalStatus={setDeleteProjectModalStatus}
                    reloadPage={setRequestReload}
                    reloadCondition={requestReload}
                    isAdmin={true}
                  />
                )}
                <button
                  className="edit"
                  onClick={() => handleEditClick(project, "projects")}
                  type="button"
                  key={i}
                >
                  EDIT
                </button>
                {editProjectModalStatus && (
                  <EditProjectModal
                    project={editValue}
                    setModalStatus={setEditProjectModalStatus}
                    reloadProject={setRequestReload}
                    reloadCondition={requestReload}
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
        <form onSubmit={handleTicketsSubmit}>
          <input
            type="text"
            placeholder="Search tickets by title..."
            value={ticketsUserInput}
            onChange={(event) => setTicketsUserInput(event.target.value)}
          ></input>
          <button className="submit" type="submit">
            SUBMIT
          </button>
        </form>
        {ticketsConfirmation &&
          tickets.map((ticket, i) => (
            <div className="ticket-container">
              <div className="buttons">
                <button
                  className="delete"
                  type="button"
                  key={i}
                  onClick={() => handleDeleteClick(ticket, "tickets")}
                >
                  X
                </button>
                {deleteTicketModalStatus && (
                  <DeleteModal
                    ticket={deleteValue}
                    setModalStatus={setDeleteTicketModalStatus}
                    reloadPage={setRequestReload}
                    reloadCondition={requestReload}
                    isAdmin={true}
                  />
                )}
                <button
                  className="edit"
                  onClick={() => handleEditClick(ticket, "tickets")}
                  type="button"
                >
                  EDIT
                </button>
                {editTicketModalStatus && (
                  <EditModel
                    ticket={editValue}
                    setModalStatus={setEditTicketModalStatus}
                    reloadTicket={setRequestReload}
                    reloadCondition={requestReload}
                  />
                )}
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
      <div className="column">
        <h3>USERS</h3>
        <form onSubmit={handleUsersSubmit}>
          <input
            type="text"
            placeholder="Search users by username..."
            value={usersUserInput}
            onChange={(event) => setUsersUserInput(event.target.value)}
          ></input>
          <button className="submit" type="submit">
            SUBMIT
          </button>
        </form>
        {usersConfirmation &&
          users.map((user, i) => (
            <div key={i} className="ticket-container">
              <div className="buttons">
                <button
                  className="edit"
                  onClick={() => handleEditClick(user, "users")}
                  type="button"
                >
                  EDIT
                </button>
                {editUserAuthModal && (
                  <AdminUserAuthModal
                    editUser={editValue}
                    reloadPage={setRequestReload}
                    reloadCondition={requestReload}
                    setModalStatus={setEditUserAuthModal}
                  />
                )}
              </div>
              <div className="ticket-info-box">
                <h4>{user.username}</h4>
                {user.is_staff === true ? <p>ADMIN</p> : <p>NOT ADMIN</p>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminPage;
