import { React, useState } from "react";
import EditModal from "./EditModal";
import "./EditProjectStyles.css";

const EditProject = (props) => {
  //boolean controls whether edit modal is displayed or not
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <div>
      <div className="editbtn-container">
        <button onClick={() => setModalStatus(true)}>EDIT</button>
      </div>
      {modalStatus && (
        <EditProjectModal
          project={props.project}
          setModalStatus={setModalStatus}
          reloadTicket={props.reloadTicket}
        />
      )}
    </div>
  );
};

export default EditProject;
