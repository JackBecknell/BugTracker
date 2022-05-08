import { React, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./AddTicketStyles.css";

function AddTicketModel(props) {
  //NEED PROJECT ID IMPORT

  const [user, token] = useAuth();
  //Single values
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescrip, setTicketDescrip] = useState("");
  //Double values
  const [ticketType, setTicketType] = useState([null, "SELECT"]);
  const [ticketPriority, setTicketPriority] = useState([null, "SELECT"]);

  //Data in for priorities and types is hardcoded as these values will never change in database.
  const ticketFkOptionsDict = {
    priorities: [
      [1, "High"],
      [2, "Medium"],
      [3, "Low"],
    ],
    types: [
      [1, "Task"],
      [2, "Functional"],
      [3, "Logical"],
      [4, "Workflow"],
      [5, "Unit Level"],
      [6, "System-Level Integration"],
      [7, "Out of Bounds"],
      [8, "Unknown"],
    ],
  };

  const postTicket = async (newTicket) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/tickets/post/", newTicket, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      props.reloadProject(true);
      props.setModalStatus(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  //upon user clicking submit this function formats newly updated data and passes it to axios request then closes the modal.
  function handleSubmit(event) {
    event.preventDefault();
    let newTicket = {
      title: ticketTitle,
      description: ticketDescrip,
      project_id: props.projectId,
      author_id: user.id,
      is_completed: false,
      priority_id: ticketPriority[0],
      type_id: ticketType[0],
    };
    postTicket(newTicket);
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <form onSubmit={handleSubmit}>
          <div className="cancel-submit-btns">
            <button
              onClick={() => props.setModalStatus(false)}
              className="cancelBtn"
            >
              CANCEL
            </button>
            <button type="submit" className="ticketSubmitBtn">
              SUBMIT
            </button>
          </div>
          <h4>TITLE</h4>
          <input
            rows="1"
            className="auto_height"
            maxlength="40"
            type="text"
            value={ticketTitle}
            onChange={(event) => setTicketTitle(event.target.value)}
          />
          <h4>DESCRIPTION</h4>
          <textarea
            rows="4"
            className="auto_height"
            maxlength="1250"
            type="text"
            value={ticketDescrip}
            onChange={(event) => setTicketDescrip(event.target.value)}
          />
        </form>
        <div className="space-around">
          <div class="dropdown">
            <h5>PRIORITY</h5>
            <button class="dropbtn">{ticketPriority[1]}</button>
            <div class="dropdown-content">
              {ticketFkOptionsDict.priorities.map((priority, index) => {
                return (
                  <button
                    key={index + 1}
                    onClick={() => setTicketPriority(priority)}
                  >
                    {priority[1]}
                  </button>
                );
              })}
            </div>
          </div>
          <div class="dropdown">
            <h5>TICKET TYPE</h5>
            <button class="dropbtn">{ticketType[1]}</button>
            <div class="dropdown-content">
              {ticketFkOptionsDict.types.map((type, index) => {
                return (
                  <button key={index + 1} onClick={() => setTicketType(type)}>
                    {type[1]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddTicketModel;
