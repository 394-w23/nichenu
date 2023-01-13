import styled from "styled-components";
import "./Navbar.css";
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine";
import { ActionIcon, Menu, Button } from "@mantine/core";
import {HiOutlineUserGroup} from "@react-icons/all-files/hi/HiOutlineUserGroup";
import {HiOutlineCalendar} from "@react-icons/all-files/hi/HiOutlineCalendar";


const MenuToggle = ({setSelection}) => (
  <Menu shadow="md" width={200}>
    <Menu.Target>
    <ActionIcon>
          <RiAddCircleLine size={24} />
    </ActionIcon>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item icon={<HiOutlineUserGroup size={14} />} onClick={() => setSelection("createHobby")}>Create Hobby</Menu.Item>
      <Menu.Item icon={<HiOutlineCalendar size={14} />} onClick={() => setSelection("createEvent")}>Create Event</Menu.Item>
    </Menu.Dropdown>
  </Menu>
);
// New Navbar
const Navbar = ({ displayOptions, selection, setSelection }) => {
  return (
    <StyledNavArea>
      <StyledNavButton
        key={"events"}
        underline={selection == "events"}
        id={"events"}
        onClick={(e) => setSelection(e.target.id)}
      >
        events
      </StyledNavButton>
      <div className="event-icon">
      </div>
      <MenuToggle setSelection = {setSelection}/>
      <StyledNavButton
        key={"hobbies"}
        underline={selection == "hobbies"}
        id={"hobbies"}
        onClick={(e) => setSelection(e.target.id)}
      >
        hobbies
      </StyledNavButton>

      {/* {displayOptions.map(opt=> <StyledNavButton key={opt} underline={selection == opt} id={opt} onClick={(e)=> setSelection(e.target.id)} >{opt}</StyledNavButton>)} */}
    </StyledNavArea>
  );
};

export default Navbar;

// Nav Styled Components
const StyledNavButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  height: 100%;
  padding: 0 20px;
  ${(props) => props.underline && `text-decoration: underline`};
`;

const StyledNavArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 10vh;
  position: fixed;
  width: 100vw;
  bottom: 0;
  background-color: #efefef;
`;
