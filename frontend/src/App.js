// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import DashBoard from "./pages/DashBoard/DashBoard";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProjectPage from "./pages/ProjectPage/Project";
import TicketsPage from "./pages/TicketsPage/Tickets";
import AdminPage from "./pages/AdminPage/Admin";

// Component Imports
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/projectPage"
          element={
            <PrivateRoute>
              <ProjectPage />
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
        <Route
          path="/adminPage"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
