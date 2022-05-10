import { useState } from "react";
import FilterTicketsByInputModal from "./FilterProjectsByInputModal";
import FilterTicketsByDateModal from "./FilterProjectsByDateModal";
import "./FilterTicketsStyles.css";

const FilterTickets = (props) => {
  const [filterDateModalStatus, setFilterDateModalStatus] = useState(false);
  const [filterInputModalStatus, setFilterInputModalStatus] = useState(false);

  const [filterButtonName, setFilterButtonName] = useState(
    "CLICK TO ADD FILTER"
  );
  const [inputBoxPlaceHolder, SetInputBoxPlaceHolder] = useState("Search");
  const [filterBy, setFilterBy] = useState("");
  const [modelButtonName, setModelButtonName] = useState("");

  function handleClick(buttonName, dbQueryTrait, modalBtnName) {
    console.log("noice");
    // setFilterButtonName(buttonName);
    // setModelButtonName(modalBtnName);
    // setFilterInputModelStatus(true);
    // setFilterButtonModalStatus(false);
    // setFilterTrait(dbQueryTrait);
  }

  //handles user clicking reset button refreshing the table
  function handleReset() {
    props.reloadTickets(true);
    setFilterDateModalStatus(false);
    setFilterInputModalStatus(false);
    setFilterButtonName("CLICK TO ADD FILTER");
  }
  //Used for: author, priority, title/ticket name,
  function handleInputClick(fltrBtnTxt, fltrBy, srchBarText) {
    SetInputBoxPlaceHolder(srchBarText);
    setFilterInputModalStatus(true);
    setFilterDateModalStatus(false);
    setFilterButtonName(fltrBtnTxt);
    setFilterBy(fltrBy);
  }

  function handleDateClick(fltrBtnTxt) {
    setFilterButtonName(fltrBtnTxt);
    setFilterInputModalStatus(false);
    setFilterDateModalStatus(true);
  }

  return (
    <div className="filter-modal-fullcontainer">
      <div className="filter-and-modal">
        <div>
          {/* <button className="reset-btn" onClick={handleReset}>
            RESET FILTER
          </button> */}
        </div>
        <div className="inputModal-dropDown">
          {filterInputModalStatus && (
            <FilterTicketsByInputModal
              filterBy={filterBy}
              tickets={props.tickets}
              setTickets={props.setTickets}
              inputBoxPlaceHolder={inputBoxPlaceHolder}
              handleReset={handleReset}
            />
          )}
          {filterDateModalStatus && (
            <FilterTicketsByDateModal
              tickets={props.tickets}
              setTickets={props.setTickets}
              handleReset={handleReset}
            />
          )}
          <div className="dropdown">
            <button className="dropbtn">{filterButtonName}</button>
            <div className="dropdown-content">
              <button
                onClick={() => {
                  handleInputClick(
                    "TICKET NAME",
                    ["title"],
                    "Search by ticket name..."
                  );
                }}
              >
                Ticket Name
              </button>
              <button
                onClick={() => {
                  handleInputClick(
                    "PRIORITY",
                    ["priority", "title"],
                    "Search by priority..."
                  );
                }}
              >
                Priority
              </button>
              <button
                onClick={() => {
                  handleInputClick(
                    "STATUS",
                    ["is_completed"],
                    "Search by status..."
                  );
                }}
              >
                Status
              </button>
              <button
                onClick={() => {
                  handleInputClick(
                    "AUTHOR",
                    ["author", "username"],
                    "Search by author..."
                  );
                }}
              >
                Author
              </button>
              <button
                onClick={() => {
                  handleDateClick("DATE");
                }}
              >
                Date
              </button>
            </div>
          </div>
        </div>
        <div>
          {/* {filterModelOpen && (
            <FilterSongsModal
              songs={props.songs}
              trait={filterTrait}
              buttonName={modelButtonName}
              setDisplay={props.setDisplay}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};
export default FilterTickets;
