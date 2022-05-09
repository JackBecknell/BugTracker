import { React, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./DeleteTicketStyles.css";
import { useNavigate } from "react-router-dom";

function DeleteModal(props) {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [delTextBox, setDelTextBox] = useState("");

  const delTicket = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/tickets/${props.ticket.id}/`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (props.comingFrom === "Projects.jsx") {
        navigate(`/projectPage/${props.projectId}`);
      } else if (props.comingFrom === "Tickets.jsx") {
        navigate("/ticketsPage");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (delTextBox === "farewell-ticket") {
      delTicket();
    } else {
      alert(
        "In order to delete your ticket you must type...\n\nfarewell-ticket\n\n...exactly. Check your spelling and try again."
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
              if (delTextBox === "farewell-ticket") {
                delTicket();
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
            Deleting a ticket is permanent...which is a pretty long time.
            <br></br>
            If you want to continue type "farewell-ticket" in the input box
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
export default DeleteModal;
