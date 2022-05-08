// General Imports
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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

function App() {
  //this useState function is called when user click on a project setting proj pk.
  //Required for ticket deletion and creation functionality
  const [projectId, setProjectId] = useState(0);

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
