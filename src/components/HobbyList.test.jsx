import { describe, expect, } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import * as testData from '../../saved-data/nichenu-default-rtdb-export.json'
import HobbyList from "./HobbyList";
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



describe("Testing Hobby Page", () => {
  beforeEach(() => {
    // console.log(testData.users)
    render(<App />);
  });

  // check hobby list
  it("Should load Hobby List", async () => {
    render(<HobbyList hobbyList={testData.hobbies ? Object.values(testData.hobbies).sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())) : []} user={Object.values(testData.users)[0]} openMessages={vi.fn()} setCurrDisplay={vi.fn()} />)
    await screen.findByText("My Hobbies");
    expect(screen.getByText("Agile Club")).toBeDefined()
  });


  //clear any available hobbies 
  it("Should clear hobbies", async () => {
    Object.values(testData.users)[0].hobby_ids = null
    render(<HobbyList hobbyList={testData.hobbies ? Object.values(testData.hobbies).sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())) : []} user={Object.values(testData.users)[0]} openMessages={vi.fn()} setCurrDisplay={vi.fn()} />)
    await screen.findByText("My Hobbies");
    expect(screen.getByText("Go join hobbies!")).toBeDefined()
  });


  it("Should add hobby to Hobby List", async () => {
    let user = Object.values(testData.users)[0];
    let hobby1 = Object.values(testData.hobbies)[0]; // Just Dance squad

    hobby1.message_chat.users = { ...hobby1.message_chat.users, [user.id]: user.id }; // add just dance squad
    user.hobby_ids = { [hobby1.id]: hobby1.id }
    render(<HobbyList hobbyList={[hobby1] || []} user={user} openMessages={vi.fn()} setCurrDisplay={vi.fn()} />)
    await screen.findByText("My Hobbies");
    expect(screen.getByText("Just Dance squad")).toBeDefined()
  });

});