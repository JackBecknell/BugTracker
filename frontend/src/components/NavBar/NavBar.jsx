import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import "./NavBarStyles.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userResponse = await axios.get(
          `http://127.0.0.1:8000/api/auth/assign/${user.id}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setIsAdmin(userResponse.data.is_staff);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);

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
            {}
          </li>
          {isAdmin ? (
            <div>
              <div className="divider"></div>
              <li>
                <button onClick={() => navigate("/adminPage")}>Admin</button>
              </li>
            </div>
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
