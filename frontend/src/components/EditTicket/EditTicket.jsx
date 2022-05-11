import { React, useState } from "react";
import EditModal from "./EditModal";
import "./EditTicket.css";

const EditTicket = (props) => {
  //boolean controls whether edit modal is displayed or not
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <div>
      <div className="editbtn-container">
        <button onClick={() => setModalStatus(true)}>EDIT</button>
      </div>
      {modalStatus && (
        <EditModal
          ticket={props.ticket}
          setModalStatus={setModalStatus}
          reloadTicket={props.reloadTicket}
          reloadCondition={props.reloadCondition}
        />
      )}
    </div>
  );
};

export default EditTicket;
