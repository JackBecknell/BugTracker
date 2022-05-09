import { React, useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";
import "./DeleteProjectStyles.css";

const DeleteProject = (props) => {
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
          <DeleteProjectModal
            project={props.project}
            setModalStatus={setModalStatus}
          />
        )}
      </div>
    </div>
  );
};

export default DeleteProject;
