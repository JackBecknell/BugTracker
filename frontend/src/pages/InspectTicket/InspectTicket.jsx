import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./InspectTicket.css";
import axios from "axios";

const InspectTicketPage = (props) => {
  //token is used for axios request
  const [user, token] = useAuth();
  // id is used for navigating pages
  const { id } = useParams();
  const [ticket, setTicket] = useState([]);
  //comments have yet to be built in the backend
  const [displayComments, setDisplayComments] = useState(false);
  const [comments, setComments] = useState([]);

  //need to update after comments have been created and added to db.
  useEffect(() => {
    const fetchTicket = async () => {
      let ticketResponse;
      //let commentsResponse;
      try {
        ticketResponse = await axios.get(
          `http://127.0.0.1:8000/api/tickets/${id}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (error) {
        console.log(error.message);
      }
      //   try {      !!!CHANGE TO COMMENTS!!!
      //     ticketsResponse = await axios.get(
      //       `http://127.0.0.1:8000/api/tickets/list/${id}/`,
      //       {
      //         headers: {
      //           Authorization: "Bearer " + token,
      //         },
      //       }
      //     );
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      setTicket(ticketResponse.data);

      //   setProject(projectResponse.data);
    };
    fetchTicket();
  }, [id]);

  //conditional rendering for bool field in ticket.
  let status;
  if (ticket.is_completed == false) {
    status = "Incomplete";
  } else {
    status = "Completed";
  }

  let comntTogglBtnTxt = "VIEW COMMENTS";
  let returnComments;
  if (displayComments) {
    returnComments = (
      <div>
        <p>user now sees comments!!</p>
        <p>user now sees comments!!</p>
        <p>user now sees comments!!</p>
      </div>
    );
    comntTogglBtnTxt = "HIDE COMMENTS";
  } else {
    returnComments = <div></div>;
    comntTogglBtnTxt = "VIEW COMMENTS";
  }

  return (
    <div className="nav-ticketAndComment-container">
      <NavBar />
      <div className="ticket-comments-container">
        {ticket.id && (
          <div>
            <div className="ticket-head">
              <h3>TICKET : {ticket.title}</h3>
            </div>
            <div className="ticket-info-container">
              <p>author</p>
              <h3>{ticket.author.username}</h3>
              <p>priority</p>
              <h3>{ticket.priority.title}</h3>
              <p>type</p>
              <h3>{ticket.type.title}</h3>
              <p>posted</p>
              <h3>{ticket.date_time_created}</h3>
              <p>status</p>
              <h3>{status}</h3>
              <p>parent project</p>
              <h3>{ticket.project.title}</h3>
              <p>description</p>
              <h3>{ticket.description}</h3>
            </div>
            <div>
              <button onClick={() => setDisplayComments(!displayComments)}>
                {comntTogglBtnTxt}
              </button>
              <div>{returnComments}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectTicketPage;
