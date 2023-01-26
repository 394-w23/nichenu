import { ActionIcon, Button } from "@mantine/core";
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

  return (<div style={{display: currDisplay == "auth"? "none": "flex"}} className="header-top-row">
    <div className="header-group">
      {currDisplay === "message" ?
        <div style={{width: "24%"}}><ActionIcon className="back-button" onClick={() => goBack()}>
        <RiArrowLeftSLine className="back-arrow" size={32} />
      </ActionIcon></div> : <div style={{width: "25%"}}></div>}
      {/* <div style={{width: currDisplay === "message"? 0: 80}}></div>     */}
      <h1 className="app-name">nicheNU</h1>      
      {/* <div style={{width: currDisplay === "message"? 20: 0}}></div>     */}
      <div style={{width: "25%",display: "flex", justifyContent: "right"}}>
        <Button size="xs">Logout</Button>
      </div>
      
    </div>
  </div>);
}

export default Header;
