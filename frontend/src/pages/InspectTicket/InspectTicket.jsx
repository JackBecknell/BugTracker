import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import EditTicket from "../../components/EditTicket/EditTicket";
import DeleteTicket from "../../components/DeleteTicket/DeleteTicket";
import "./InspectTicket.css";
import axios from "axios";

const InspectTicketPage = (props) => {
  const [user, token] = useAuth();

  // id defines ticket pk, comingFrom defines where the user will be
  //routed should the ticket be deleted
  const { id, comingFrom } = useParams();

  //All ticket values stored here post axios request
  const [ticket, setTicket] = useState([]);

  //value put into post comment input
  const [commentText, setCommentText] = useState("");
  //holds conditional value for displaying comments
  const [displayComments, setDisplayComments] = useState(false);
  //comments holds all comments returned by axios request
  const [comments, setComments] = useState([]);
  const [requestReload, setRequestReload] = useState(true);

  //On change of id in params this useEffect triggers the one below
  useEffect(() => {
    setRequestReload(!requestReload);
  }, [id]);

  useEffect(() => {
    const fetchTicket = async () => {
      let ticketResponse;
      let commentsResponse;
      try {
        ticketResponse = await axios.get(
          `http://127.0.0.1:8000/api/tickets/${id}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setTicket(ticketResponse.data);
      } catch (error) {
        console.log(error.message);
      }
      try {
        commentsResponse = await axios.get(
          `http://127.0.0.1:8000/api/comments/${id}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setComments(commentsResponse.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTicket();
  }, [requestReload]);

  //conditional rendering for bool field in ticket.
  let status;
  if (ticket.is_completed === false) {
    status = "Incomplete";
  } else {
    status = "Completed";
  }

  const postComment = async (newComment) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/comments/postComment/",
        newComment,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setRequestReload(!requestReload);
    } catch (error) {
      console.log(error.message);
    }
    setCommentText("");
  };

  function handleSubmit(event) {
    event.preventDefault();
    let newComment = {
      text: `${commentText}`,
      user_id: user.id,
      ticket_id: ticket.id,
    };
    postComment(newComment);
  }

  let postCommentForm;
  if (displayComments) {
    postCommentForm = (
      <div>
        <form
          onSubmit={handleSubmit}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              let newComment = {
                text: `${commentText}`,
                user_id: user.id,
                ticket_id: ticket.id,
              };
              postComment(newComment);
            }
          }}
        >
          <textarea
            type="text"
            placeholder="Type comment here..."
            rows="4"
            maxlength="1000"
            className="auto_height"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          <button type="submit">POST</button>
        </form>
      </div>
    );
  } else {
    postCommentForm = <div></div>;
  }
  //text that is desplayed in the button below create comment
  let comntTogglBtnTxt = "VIEW COMMENTS";
  //conditional value for conent rendered upon VIEW COMMENTS button being selected
  let returnComments;
  if (displayComments) {
    if (comments.length >= 1) {
      returnComments = (
        <div className="comments-container">
          {comments
            .slice(0)
            .reverse()
            .map((comment, i) => (
              <div key={i} className="comment-box">
                <h4>{comment.user.username}</h4>
                <div className="commenttext-container">
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
        </div>
      );
    } else {
      returnComments = (
        <p>
          Oops...Looks like this ticket has no comments. You can be the first!
        </p>
      );
    }
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
            <div>
              <div className="ticket-head">
                <h3>TICKET : {ticket.title}</h3>
              </div>
              {user.id == ticket.author.id ? (
                <div className="edit-delete-container">
                  <div>
                    <EditTicket
                      ticket={ticket}
                      reloadTicket={setRequestReload}
                      reloadCondition={requestReload}
                    />
                  </div>
                  <div className="del-Container">
                    <DeleteTicket
                      ticket={ticket}
                      projectId={props.projectId}
                      comingFrom={comingFrom}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
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
            <div></div>
            <div className="viewComments-container">
              <button
                onClick={() => setDisplayComments(!displayComments)}
                className="view-comments-btn"
              >
                {comntTogglBtnTxt}
              </button>
              <div>{postCommentForm}</div>
              <div>{returnComments}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectTicketPage;
