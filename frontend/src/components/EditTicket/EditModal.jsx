import { React, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./EditModal.css";

function EditModel(props) {
  //values for ticket
  const [ticket, setTicket] = useState(props.ticket);
  const [user, token] = useAuth();
  //Single values
  const [ticketTitle, setTicketTitle] = useState(ticket.title);
  const [ticketDescrip, setTicketDescrip] = useState(ticket.description);
  const [isCompleted, setIsCompleted] = useState(ticket.is_completed);
  //Double values
  const [ticketType, setTicketType] = useState([
    ticket.type.id,
    ticket.type.title,
  ]);
  const [ticketPriority, setTicketPriority] = useState([
    ticket.priority.id,
    ticket.priority.title,
  ]);

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

  const putTicket = async (updatedTicket) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/tickets/${props.ticket.id}/`,
        updatedTicket,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      props.reloadTicket(!props.reloadCondition);
      props.setModalStatus(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  //upon user clicking submit this function formats newly updated data and passes it to axios request then closes the modal.
  function handleSubmit(event) {
    event.preventDefault();
    let updatedTicket = {
      title: ticketTitle,
      description: ticketDescrip,
      ticket_id: ticket.id,
      project_id: props.ticket.project.id,
      author_id: user.id,
      is_completed: isCompleted,
      priority_id: ticketPriority[0],
      type_id: ticketType[0],
    };
    putTicket(updatedTicket);
  }

  //Conditionaly gives dropdown for status a text value to hold depending upon bool value.
  let statusText;
  if (isCompleted === false) {
    statusText = "Incomplete";
  } else {
    statusText = "Completed";
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
            <button type="submit" className="submitBtn">
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
        <div className="space-between">
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
          <div class="dropdown">
            <h5>STATUS</h5>
            <button class="dropbtn">{statusText}</button>
            <div class="dropdown-content">
              <button key={1} onClick={() => setIsCompleted(false)}>
                Incomplete
              </button>
              <button key={2} onClick={() => setIsCompleted(true)}>
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditModel;
