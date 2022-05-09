import { React, useState } from "react";
import "./AddTicketStyles.css";
import AddTicketModel from "./AddTicketModal";

const AddTicket = (props) => {
  //boolean controls whether edit modal is displayed or not
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <div>
      <div>
        <div className="ticketstext-addbtn-container">
          <h3>Tickets</h3>
          <button onClick={() => setModalStatus(true)}>+</button>
        </div>
        {modalStatus && (
          <AddTicketModel
            projectId={props.projectId}
            setModalStatus={setModalStatus}
            reloadProject={props.reloadProject}
          />
        )}
      </div>
    </div>
  );
};

export default AddTicket;
