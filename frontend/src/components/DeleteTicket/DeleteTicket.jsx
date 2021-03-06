import { React, useState } from "react";
import DeleteModal from "./DeleteModal";
import "./DeleteTicketStyles.css";

const DeleteTicket = (props) => {
  //boolean controls whether edit modal is displayed or not
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <div>
      <div>
        <div className="delbtn-container">
          <button onClick={() => setModalStatus(true)} id="del-button">
            DELETE
          </button>
        </div>
        {modalStatus && (
          <DeleteModal
            ticket={props.ticket}
            projectId={props.projectId}
            setModalStatus={setModalStatus}
            comingFrom={props.comingFrom}
          />
        )}
      </div>
    </div>
  );
};

export default DeleteTicket;
