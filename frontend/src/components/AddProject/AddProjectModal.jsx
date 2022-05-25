import { React, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./AddProjectStyles.css";

function AddProjectModal(props) {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  //Single values
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescrip, setProjectDescrip] = useState("");

  const postProject = async (newProject) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/projects/post/", newProject, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      props.reloadProject(true);
      props.setAddButtonIsClicked(false);
      props.setModalStatus(false);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  //function creates project for axios
  function handleSubmit(event) {
    event.preventDefault();
    let newProject = {
      title: projectTitle,
      description: projectDescrip,
      project_author_id: user.id,
    };
    postProject(newProject);
  }

  function handleCancel() {
    props.setAddButtonIsClicked(false);
    props.setModalStatus(false);
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <form onSubmit={handleSubmit}>
          <div className="cancel-submit-btns">
            <button onClick={handleCancel} className="cancel-Btn">
              CANCEL
            </button>
            <button type="submit" className="ticket-Submit-Btn">
              SUBMIT
            </button>
          </div>
          <div className="create-new-project">
            <h4>CREATE NEW PROJECT</h4>
          </div>
          <h4>TITLE</h4>
          <input
            rows="1"
            className="auto_height"
            maxlength="30"
            type="text"
            value={projectTitle}
            onChange={(event) => setProjectTitle(event.target.value)}
          />
          <h4>DESCRIPTION</h4>
          <textarea
            rows="4"
            className="auto_height"
            maxlength="1250"
            type="text"
            value={projectDescrip}
            onChange={(event) => setProjectDescrip(event.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
export default AddProjectModal;
