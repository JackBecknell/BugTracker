import { React, useState } from "react";
import "./AddProjectStyles.css";
import AddProjectModal from "./AddProjectModal.jsx";

const AddProject = (props) => {
  //boolean controls whether edit modal is displayed or not
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <div>
      <div>
        <div className="projects-addbtn-container">
          <button onClick={() => setModalStatus(true)}>+</button>
        </div>
        {modalStatus && (
          <AddProjectModal
            reloadProject={props.reloadProject}
            setModalStatus={setModalStatus}
          />
        )}
      </div>
    </div>
  );
};

export default AddProject;
