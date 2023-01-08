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

const ListOptionSelector = ({listOptions, selection, setSelection} ) => {
    //{console.log(listOptions)}
    return (
    <div className="btn-group">
        {
            listOptions.map(listOption => <NavButton key={listOption} listOption={listOption} selection={selection} setSelection={setSelection} />)
        }
    </div>
    )
};


const Navbar = ( {listOptions, selection,setSelection} ) => {
    return (
        <div className=" pb-2 fixed-bottom text-center">
            <ListOptionSelector listOptions={listOptions} selection={selection} setSelection={setSelection} />
        </div>
    );
}

export default Navbar;
