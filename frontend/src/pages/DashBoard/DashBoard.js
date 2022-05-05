import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "./DashBoardStyless.css";
import NavBar from "../../components/NavBar/NavBar";

const DashBoard = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  //KEEPING FOR REFERENCE.
  //useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);

  return (
    <div className="nav-projects-container">
      <NavBar />
      <div>
        <h1>Home Page for {user.username}!</h1>
        <button className="unNamed" onClick={() => navigate("/projectPage")}>
          ToProjectPage
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
