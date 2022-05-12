import { useState } from "react";
import "./FilterTicketsStyles.css";

function FilterObjectsByDateModal(props) {
  const [searchDate, setsearchDate] = useState("");

  function handleSearch() {
    let returnArray = [];
    for (const [key, value] of Object.entries(props.tickets)) {
      if (value["date_time_created"] === searchDate) {
        returnArray.push(value);
      }
    }
    if (returnArray.length < 1) {
      alert(`Sorry, None of our tickets have a date of ${searchDate}`);
    } else {
      props.setTickets(returnArray);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
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
          id="date-input"
          placeholder="Search"
          type="date"
          value={searchDate}
          onChange={(event) => setsearchDate(event.target.value)}
        />
      </form>
    </div>
  );
}

export default FilterObjectsByDateModal;
