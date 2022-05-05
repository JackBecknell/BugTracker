import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="Header">
      <ul className="ul">
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>BUGtracker</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button className="dfaultButton" onClick={logoutUser}>
              Logout
            </button>
          ) : (
            <button className="dfaultButton" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
