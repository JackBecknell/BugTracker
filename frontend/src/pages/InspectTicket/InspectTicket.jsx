import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
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
  const [comntTogglBtnTxt, setComntTogglBtnTxt] = useState("VIEW COMMENTS");
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
  //"VIEW COMMENTS"comntTogglBtnTxt
  function handleCommentsView() {
    setDisplayComments(!displayComments);
    if (comntTogglBtnTxt === "VIEW COMMENTS") {
      setComntTogglBtnTxt("HIDE COMMENTS");
    } else {
      setComntTogglBtnTxt("VIEW COMMENTS");
    }
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
              <div className="ticket-info-half-box">
                <div className="info-row">
                  <div className="author-text">
                    <p>AUTHOR</p>
                    <h2>{ticket.author.username}</h2>
                  </div>
                  <div className={status}>
                    <p>STATUS</p>
                    <h2>{status}</h2>
                  </div>
                </div>
                <div className="info-row border-bottom-top">
                  <div>
                    <p>PRIORITY</p>
                    <h2>{ticket.priority.title}</h2>
                  </div>
                  <div>
                    <p>TYPE</p>
                    <h2>{ticket.type.title}</h2>
                  </div>
                </div>
                <div className="info-column">
                  <p>TICKET POSTED</p>
                  <h3>{ticket.date_created}</h3>
                  <p>PARENT PROJECT</p>
                  <h3>{ticket.project.title}</h3>
                </div>
              </div>
              <div className="ticket-info-half-box">
                <div className="ticket-descrip-box">
                  <p>DESCRIPTION</p>
                  <h3>{ticket.description}</h3>
                </div>
              </div>
            </div>
            <div></div>
            <div className="viewComments-container">
              <div className="toggle-txtarea-post">
                <div>
                  <button
                    onClick={() => handleCommentsView()}
                    className="view-comments-btn"
                  >
                    {comntTogglBtnTxt}
                  </button>
                </div>
                {displayComments ? (
                  <div className="txtarea-post">
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
                      <button className="view-comments-btn" type="submit">
                        POST
                      </button>
                    </form>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
              {displayComments ? (
                <div>
                  {comments.length >= 1 ? (
                    <div className="comments-container">
                      {comments
                        .slice(0)
                        .reverse()
                        .map((comment, i) => (
                          <div key={i} className="comment-box">
                            <div>
                              <h4>{comment.user.username}</h4>
                            </div>
                            <div className="commenttext-container">
                              <p>{comment.text}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p>
                      Oops...Looks like this ticket has no comments. You can be
                      the first!
                    </p>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectTicketPage;
