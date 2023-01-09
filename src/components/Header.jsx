import { useState } from "react";
import "./Header.css";

const Header = ({ currDisplay, setCurrDisplay }) => {

  const [prevDisplay, setPrevDisplay] = useState(currDisplay)
  const goBack = () => {
    setCurrDisplay(prevDisplay)
  }

  if(currDisplay !== prevDisplay && currDisplay !== 'message'){
    setPrevDisplay(currDisplay)
  }

  return (<div className="header-top-row">
    <div className="header-group">
      {currDisplay === "message" && <button onClick={() => goBack()}>back</button>}
      <h1 className="app-name">nicheNU</h1>
    </div>
  </div>);
}

export default Header;
