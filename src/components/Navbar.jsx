import "./Navbar.css";


const NavButton = ({ listOption, selection, setSelection }) => (
    //console.log(listOption);
    //console.log(selection);
    //console.log(setSelection);
    <div>
        <input type="radio" id={listOption} className="btn-check" checked={listOption == selection} autoComplete="off"
            onChange={() => setSelection(listOption)}/>
        <label className="btn btn-outline-primary" htmlFor={listOption}>
            {listOption}
        </label>
    </div>
);

const DisplayOptionSelector = ({displayOptions, selection, setSelection} ) => {
    //{console.log(displayOptions)}
    return (
    <div className="btn-group">
        {
            displayOptions.map(listOption => <NavButton key={listOption} listOption={listOption} selection={selection} setSelection={setSelection} />)
        }
    </div>
    )
};


const Navbar = ( {displayOptions, selection,setSelection} ) => {
    return (
        <div className=" pb-2 fixed-bottom text-center">
            <DisplayOptionSelector displayOptions={displayOptions} selection={selection} setSelection={setSelection} />
        </div>
    );
}

export default Navbar;
