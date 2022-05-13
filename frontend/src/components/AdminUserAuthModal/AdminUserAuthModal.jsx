import { React, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./AdminUserAuthModal.css";

function AdminUserAuthModal(props) {
  //values for currrent user
  const [user, token] = useAuth();

  //useState variables start holding the data passed from admin page but updated as the user changes them.
  //Same variables that are used to contruct the user object to be used in the put request to the database.
  const [username, setUsername] = useState(props.editUser.username);
  const [isStaff, setIsStaff] = useState(props.editUser.is_staff);

  const putUser = async (updatedUser) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/auth/assign/${props.editUser.id}/`,
        updatedUser,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      props.reloadPage(!props.reloadCondition);
      props.setModalStatus(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    let updatedUser = {
      username: username,
      is_staff: isStaff,
    };
    putUser(updatedUser);
  }

  //Conditionaly gives dropdown for status a text value to hold depending upon bool value.
  //   let statusText;
  //   if (isStaff === false) {
  //     statusText = "NOT ADMIN";
  //   } else {
  //     statusText = "AMDIN";
  //   }

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
          <h4>USERNAME</h4>
          <input
            rows="1"
            className="auto_height"
            maxlength="150"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </form>
        <div>
          <div class="dropdown">
            <h5>STATUS</h5>
            <button class="dropbtn">{isStaff ? "ADMIN" : "NOT ADMIN"}</button>
            <div class="dropdown-content">
              <button key={1} onClick={() => setIsStaff(false)}>
                NOT ADMIN
              </button>
              <button key={2} onClick={() => setIsStaff(true)}>
                ADMIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminUserAuthModal;
