import { useState } from "react";
//
import FilterProjectsByInputModal from "./FilterProjectsByInputModal";
import FilterProjectsByDateModal from "./FilterProjectsByDate";
import "./FilterProjectsStyles.css";

const FilterProjects = (props) => {
  const [filterDateModalStatus, setFilterDateModalStatus] = useState(false);
  const [filterInputModalStatus, setFilterInputModalStatus] = useState(false);

  const [filterButtonName, setFilterButtonName] = useState(
    "CLICK TO ADD FILTER"
  );
  const [inputBoxPlaceHolder, SetInputBoxPlaceHolder] = useState("Search");
  const [filterBy, setFilterBy] = useState("");
  const [modelButtonName, setModelButtonName] = useState("");

  //handles user clicking reset button refreshing the table
  function handleReset() {
    props.reloadProjects(true);
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
        <div></div>
        <div className="inputModal-dropDown-projects">
          {filterInputModalStatus && (
            <FilterProjectsByInputModal
              filterBy={filterBy}
              projects={props.projects}
              setProjects={props.setProjects}
              inputBoxPlaceHolder={inputBoxPlaceHolder}
              handleReset={handleReset}
            />
          )}
          {filterDateModalStatus && (
            <FilterProjectsByDateModal
              projects={props.projects}
              setProjects={props.setProjects}
              handleReset={handleReset}
            />
          )}
          <div className="dropdown">
            <button className="prjct-dropbtn">{filterButtonName}</button>
            <div className="dropdown-content">
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
                    "PROJECT TITLE",
                    ["title"],
                    "Search by project name..."
                  );
                }}
              >
                Project Title
              </button>
              <button
                onClick={() => {
                  handleInputClick(
                    "AUTHOR",
                    ["project_author", "username"],
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
      </div>
    </div>
  );
};
export default FilterProjects;
