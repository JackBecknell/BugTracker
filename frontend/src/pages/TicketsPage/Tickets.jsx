import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./TicketsStyles.css";
import NavBar from "../../components/NavBar/NavBar";

const TicketsPage = (props) => {
  const [user, token] = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/tickets/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTickets();
  }, [token]);

  let table;
  if (tickets.length) {
    table = (
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket Name</th>
            <th>Status</th>
            <th>Priority</th>
            <th>DatePosted</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tickets &&
            tickets.map((ticket, i) => {
              let completeStatus;
              if (ticket.is_completed !== true) {
                completeStatus = <td className="status">Incomplete</td>;
              } else {
                completeStatus = <td className="status">Complete</td>;
              }
              return (
                <tr key={i} className="table-row">
                  <td>{ticket.title}</td>
                  <td>{completeStatus}</td>
                  <td>{ticket.priority.title}</td>
                  <td>{ticket.date_time_created}</td>
                  <td>{ticket.author.username}</td>
                  <Link
                    key={i}
                    to={`/inspectTicket/${ticket.id}/Tickets.jsx`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="ticket-view-btn">
                      <h3>VIEW</h3>
                    </div>
                  </Link>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  } else {
    table = (
      <p>
        Oops...Our database doesn't seem to have any tickets. You can be the
        first to post one!
      </p>
    );
  }

  // START TEST ZONE
  function handleTest() {
    let newTickets = Object.entries(tickets);
    let returnTickets = [];

    for (const [key, value] of Object.entries(tickets)) {
      console.log(`${key}: ${value}`);
      if (value.title.includes("ticket")) {
        console.log(value.title);
        returnTickets.push(value);
      }
    }
  }

  // END TEST ZONE

  return (
    <div className="nav-tickets-container">
      <NavBar />
      <div className="table-container">
        <div className="tickets-head">
          <h3>TICKETS</h3>
          <button onClick={() => handleTest()}>test</button>
        </div>
        {table}
      </div>
    </div>
  );
};

export default TicketsPage;
