import { describe, expect, } from "vitest";
import { fireEvent, getAllByTestId, getByPlaceholderText, getByTestId, getByText, render, screen } from "@testing-library/react";
import App from "../App";
import * as testData from '../../saved-data/nichenu-default-rtdb-export.json'
import CreateEvent from "./CreateEvent";



// vi.mock("./utils/firebase.js");
// useDbData = vi.fn().mockReturnValue(testData)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});




describe("Testing Event error handing", () => {

  it("should throw missing fields error", ()=> {
    let user = Object.values(testData.users)[0]
   render(
    <CreateEvent user={user}/>
   )
   const create_event_button = screen.getByText("Submit");
   fireEvent.click(create_event_button);
  console.log(screen.debug())
  expect(screen.getByText("Missing Fields")).toBeDefined()
})
  


});
