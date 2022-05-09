import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBarStyles.css";

const NavBar = () => {
  //   const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="NavBar-container">
      <div className="Side-NavBar">
        <ul>
          <li>
            <button onClick={() => navigate("/")}>Dashboard</button>
          </li>
          <div className="divider"></div>
          <li>
            <button onClick={() => navigate("/ticketsPage")}>Tickets</button>
          </li>
          <div className="divider"></div>
          <li>
            <button onClick={() => navigate("/adminPage")}>Admin</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
