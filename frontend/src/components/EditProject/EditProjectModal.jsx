import { React, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./EditProjectStyles.css";

function EditProjectModal(props) {
  //values for project
  const [project, setTicket] = useState(props.project);
  const [user, token] = useAuth();
  //Single values
  const [projectTitle, setProjectTitle] = useState(project.title);
  const [projectDescrip, setProjectDescrip] = useState(project.description);
  const [isCompleted, setIsCompleted] = useState(project.is_completed);

  const putProject = async (updatedProject) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/projects/${props.project.id}/`,
        updatedProject,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      props.reloadProject(!props.reloadCondition);
      props.setModalStatus(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  //DONT FORGET DATE RESOLVED!!!    date_time_resolved:
  //upon user clicking submit this function formats newly updated data and passes it to axios request then closes the modal.
  function handleSubmit(event) {
    event.preventDefault();
    let updatedProject = {
      title: projectTitle,
      description: projectDescrip,
      project_author_id: user.id,
      is_completed: isCompleted,
    };
    putProject(updatedProject);
  }

  //Conditionaly gives dropdown for status a text value to hold depending upon bool value.
  let statusText;
  if (isCompleted === false) {
    statusText = "Incomplete";
  } else {
    statusText = "Completed";
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <form onSubmit={handleSubmit}>
          <div className="cancel-submit-btns">
            <button
              onClick={() => props.setModalStatus(false)}
              className="cancelBtn"
            >
              CANCEL
            </button>
            <button type="submit" className="submitBtn">
              SUBMIT
            </button>
          </div>
          <h4>TITLE</h4>
          <input
            rows="1"
            className="auto_height"
            maxlength="40"
            type="text"
            value={projectTitle}
            onChange={(event) => setProjectTitle(event.target.value)}
          />
          <h4>DESCRIPTION</h4>
          <textarea
            rows="4"
            className="auto_height"
            maxlength="1250"
            type="text"
            value={projectDescrip}
            onChange={(event) => setProjectDescrip(event.target.value)}
          />
        </form>
        <div>
          <div class="dropdown">
            <h5>STATUS</h5>
            <button class="dropbtn">{statusText}</button>
            <div class="dropdown-content">
              <button key={1} onClick={() => setIsCompleted(false)}>
                Incomplete
              </button>
              <button key={2} onClick={() => setIsCompleted(true)}>
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProjectModal;
