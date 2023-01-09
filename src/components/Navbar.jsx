import styled from "styled-components";
import "./Navbar.css";


// const NavButtonX = ({ listOption, selection, setSelection }) => (

//     <div>
//         <input type="radio" id={listOption} className="btn-check" checked={listOption == selection} autoComplete="off"
//             onChange={() => setSelection(listOption)}/>
//         <label className="btn btn-outline-primary" htmlFor={listOption}>
//             {listOption}
//         </label>
//     </div>
// );

// const ListOptionSelectorX = ({listOptions, selection, setSelection} ) => {
//     return (
//     <div className="btn-group">
//         {
//             listOptions.map(listOption => <NavButton key={listOption} listOption={listOption} selection={selection} setSelection={setSelection} />)
//         }
//     </div>
//     )
// };


// const NavbarX = ( {listOptions, selection, setSelection} ) => {
//     return ( 
//         <div className="pb-2 fixed-bottom text-center">
//             <ListOptionSelector listOptions={listOptions} selection={selection} setSelection={setSelection} />
//         </div>
//     );
// }

// New Navbar
const Navbar = ({displayOptions, selection, setSelection}) => {
    return (
        <StyledNavArea>
            {displayOptions.map(opt=>  <StyledNavButton underline={selection == opt} id={opt} onClick={(e)=> setSelection(e.target.id)} >{opt}</StyledNavButton>)}
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
height: 80px;
position: absolute;
width: 100vw;
bottom: 0;
background-color: #efefef;
`;






