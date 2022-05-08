// General Imports
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./App.css";

// Pages Imports
import DashBoard from "./pages/DashBoard/DashBoard";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProjectPage from "./pages/ProjectPage/Project";
import TicketsPage from "./pages/TicketsPage/Tickets";
import AdminPage from "./pages/AdminPage/Admin";
import InspectTicketPage from "./pages/InspectTicket/InspectTicket";

// Component Imports
import Header from "./components/Header/Header";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import useAuth from "./hooks/useAuth";

function App() {
  const [user, token] = useAuth();
  //this useState function is called when user click on a project setting proj pk.
  //Required for ticket deletion functionality
  const [projectId, setProjectId] = useState(0);

  const [project, setProject] = useState([]);
  const [tickets, setTickets] = useState([]);
  //!!!redundant useState below fixes error in reloading screen, will come back to troubleshoot later.!!!
  const [author, setAuthor] = useState([]);
  const [requestReload, setRequestReload] = useState(true);

  const fetchProject = async () => {
    let projectResponse;
    let ticketsResponse;
    try {
      projectResponse = await axios.get(
        `http://127.0.0.1:8000/api/projects/${}/`,
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
    setRequestReload(false);
  };
  fetchProject();

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashBoard setProjectId={setProjectId} />
            </PrivateRoute>
          }
        />
        <Route
          path="/projectPage/:id"
          element={
            <PrivateRoute>
              <ProjectPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/inspectTicket/:id"
          element={
            <PrivateRoute>
              <InspectTicketPage projectId={projectId} />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminPage"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/ticketsPage"
          element={
            <PrivateRoute>
              <TicketsPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
// path="/selTicketsPage/:id"
