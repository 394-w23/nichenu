import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import "./Header.css";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine"
const Header = ({ currDisplay, setCurrDisplay }) => {

  const [prevDisplay, setPrevDisplay] = useState(currDisplay)
  const goBack = () => {
    setCurrDisplay(prevDisplay)
  }

  if (currDisplay !== prevDisplay && currDisplay !== 'message') {
    setPrevDisplay(currDisplay)
  }

  return (<div className="header-top-row">
    <div className="header-group">
      {currDisplay === "message" ?
        <ActionIcon onClick={() => goBack()}>
          <RiArrowLeftSLine size={32} color="white" />
        </ActionIcon> : <div></div>}
      <h1 className="app-name">nicheNU</h1>
      <div style={{width: currDisplay === "message"? 30: 0}} ></div>
    </div>
  </div>);
}

export default Header;
