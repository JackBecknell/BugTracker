import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ProjectPage = (props) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>PROJECT PAGE.</h1>
    </div>
  );
};

export default ProjectPage;
