import { React, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./DeleteProjectStyles.css";
import { useNavigate } from "react-router-dom";

function DeleteProjectModal(props) {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [delTextBox, setDelTextBox] = useState("");

  const delProject = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/projects/${props.project.id}/`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (props.isAdmin) {
        props.setModalStatus(false);
        props.reloadPage(!props.reloadCondition);
      } else {
        navigate(`/`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (delTextBox === "farewell-project") {
      delProject();
    } else {
      alert(
        "In order to delete your ticket you must type...\n\nfarewell-project\n\n...exactly. Check your spelling and try again."
      );
    }
  }

  return (
    <div className="modal2Background">
      <div className="modal2Container">
        <form
          onSubmit={handleSubmit}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (delTextBox === "farewell-project") {
                delProject();
              }
            }
          }}
        >
          <div className="cancel-submit-btns">
            <button
              onClick={() => props.setModalStatus(false)}
              className="cancelBtn"
            >
              CANCEL
            </button>

            <button type="submit" className="submitBtn">
              SUBMIT
            </button>
          </div>
          <h4>ARE YOU SURE YOU WANT TO DELETE!</h4>
          <p>
            Deleting a project will also delete all tickets assigned to it!
            <br></br>
            You will not be able to recover this project if you proceed.
            <br></br>
            If you want to continue type "farewell-project" in the input box
            below and hit submit.
          </p>
          <input
            rows="1"
            className="auto_height"
            maxlength="40"
            type="text"
            value={delTextBox}
            onChange={(event) => setDelTextBox(event.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
export default DeleteProjectModal;
