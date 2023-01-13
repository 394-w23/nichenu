import styled from "styled-components";
import "./Navbar.css";
import {RiAddCircleLine} from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon } from '@mantine/core';


// New Navbar
const Navbar = ({displayOptions, selection, setSelection}) => {
    return (
        <StyledNavArea>
            <div className="event-icon">
                <ActionIcon onClick={()=>setSelection("createHobby")}>
                    <RiAddCircleLine size={24}/>
                </ActionIcon>
            </div>
            {displayOptions.map(opt=> <StyledNavButton key={opt} underline={selection == opt} id={opt} onClick={(e)=> setSelection(e.target.id)} >{opt}</StyledNavButton>)}
        </StyledNavArea>
    )
}

export default Navbar;

// Nav Styled Components
const StyledNavButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-weight: 600;
height: 100%;
padding: 0 20px;
${props=> props.underline &&`text-decoration: underline`};
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






