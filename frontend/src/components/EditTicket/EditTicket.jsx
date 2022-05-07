import { React, useState } from "react";
import EditModal from "./EditModal";
import "./EditTicket.css";

const EditTicket = (props) => {
  //boolean controls whether edit modal is displayed or not
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <div className="editbtn-container">
      <button onClick={() => setModalStatus(true)}>EDIT</button>
      {modalStatus && (
        <EditModal
          ticket={props.ticket}
          closeModal={setModalStatus}
          reloadTicket={props.reloadTicket}
        />
      )}
    </div>
  );
};

export default EditTicket;
