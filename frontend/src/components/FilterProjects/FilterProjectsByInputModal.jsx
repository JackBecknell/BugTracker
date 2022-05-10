import { useState } from "react";

function FilterTicketsByInputModal(props) {
  const [searchTerm, setSearchTerm] = useState("");

  //Filters for priority and status
  function handleMultipleValues() {
    let returnArray = [];
    for (const [key, value] of Object.entries(props.tickets)) {
      if (value[props.filterBy[0]][props.filterBy[1]].includes(searchTerm)) {
        returnArray.push(value);
      }
    }
    if (returnArray.length >= 1) {
      props.setTickets(returnArray);
    } else {
      alert(
        `Sorry, None of our tickets authors have a ${props.filterBy[1]} that contain ${searchTerm}`
      );
    }
  }

  //Filters for author name and ticket title
  function handleOneValue() {
    let returnArray = [];
    for (const [key, value] of Object.entries(props.tickets)) {
      if (value[props.filterBy[0]].includes(searchTerm)) {
        returnArray.push(value);
      }
    }
    if (returnArray.length >= 1) {
      props.setTickets(returnArray);
    } else {
      alert(
        `Sorry, None of our tickets have a ${props.filterBy[0]} that contains ${searchTerm}`
      );
    }
  }

  function handleStatus() {
    let returnArray = [];
    let checkValue = searchTerm.toLowerCase();
    if (checkValue === "complete" || checkValue === "completed") {
      for (const [key, value] of Object.entries(props.tickets)) {
        if (value["is_completed"] === true) {
          returnArray.push(value);
        }
      }
    } else if (checkValue === "incomplete" || checkValue === "incompleted") {
      for (const [key, value] of Object.entries(props.tickets)) {
        if (value["is_completed"] === false) {
          returnArray.push(value);
        }
      }
    } else {
      alert(
        "Sorry, status is only either 'Incomplete' or 'complete' please check your spelling and try again."
      );
    }
    if (returnArray.length >= 1) {
      props.setTickets(returnArray);
    } else {
      alert(
        `Sorry, looks like none of our tickets have a status of ${searchTerm}`
      );
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.filterBy.length > 1) {
      handleMultipleValues();
    } else if (props.filterBy[0] === "is_completed") {
      handleStatus();
    } else {
      handleOneValue();
    }
  };

  return (
    <div className="reset-userFilter">
      <button id="reset-btn" onClick={props.handleReset}>
        RESET FILTER
      </button>
      <form onSubmit={handleSubmit}>
        <button className="submit-search" type="Submit">
          SUBMIT
        </button>
        <input
          id="search-by-user-input"
          placeholder={props.inputBoxPlaceHolder}
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </form>
    </div>
  );
}

export default FilterTicketsByInputModal;
