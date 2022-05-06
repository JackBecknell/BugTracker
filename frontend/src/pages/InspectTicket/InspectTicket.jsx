import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";

const InspectTicketPage = (props) => {
  const { id } = useParams();
  const [ticket, setTickets] = useState([]);
  //comments have yet to be built in the backend
  const [comments, setComments] = useState([]);

  //conditional rendering for bool field in ticket.
  let status;
  if (ticket.is_completed == false) {
    status = "Incomplete";
  } else {
    status = "Completed";
  }

  return (
    <div className="nav-ticketAndComment-container">
      <NavBar />
      <div className="ticket-comments-container">
        Ticket page renders {id}
        {ticket.id && (
          <div>
            <div className="ticket-head">
              <h3>TICKET : {ticket.title}</h3>
            </div>
            <div className="ticket-info-container">
              <p>author</p>
              <h3>{ticket.author.username}</h3>
              <p>posted</p>
              <h3>{ticket.date_time_created}</h3>
              <p>status</p>
              <h3>{status}</h3>
              <p>parent project</p>
              <h3>{ticket.project.title}</h3>
              <p>priority</p>
              <h3>{ticket.priority.title}</h3>
              <p>type</p>
              <h3>{ticket.type.title}</h3>
            </div>
            <div>COMMENTS COMING SOON!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectTicketPage;
