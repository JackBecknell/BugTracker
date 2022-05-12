import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./TicketsStyles.css";
import NavBar from "../../components/NavBar/NavBar";
import FilterTickets from "../../components/FilterTickets/FilterTickets";

const TicketsPage = (props) => {
  const [user, token] = useAuth();
  const [tickets, setTickets] = useState([]);
  const [dateSwitchText, setDateSwitchText] = useState("VIEW BY NEWEST");
  const [requestReload, setRequestReload] = useState(true);

  let reloadConditions = [token, requestReload];

  function handleTicketsMap() {
    let newTickets = tickets.reverse();
    setTickets(newTickets);
    if (dateSwitchText === "VIEW BY NEWEST") {
      setDateSwitchText("VIEW BY OLDEST");
    } else if (dateSwitchText === "VIEW BY OLDEST") {
      setDateSwitchText("VIEW BY NEWEST");
    }
  }

  useEffect(() => {
    if (requestReload) {
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
        setRequestReload(false);
      };
      fetchTickets();
    }
  }, [reloadConditions]);

  let table;
  if (tickets.length) {
    table = (
      <div className="ticket-table">
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
      </div>
    );
  } else {
    table = (
      <p>
        Oops...Our database doesn't seem to have any tickets. You can be the
        first to post one!
      </p>
    );
  }

  return (
    <div className="nav-tickets-container">
      <NavBar />
      <div className="table-container">
        <div className="tickets-head">
          <h3>TICKETS</h3>
        </div>
        <div className="fltr-dateswitch">
          <FilterTickets
            tickets={tickets}
            setTickets={setTickets}
            reloadTickets={setRequestReload}
          />
          <div className="dateSwtch">
            <button onClick={handleTicketsMap}>{dateSwitchText}</button>
          </div>
        </div>
        {table}
      </div>
    </div>
  );
};

export default TicketsPage;
