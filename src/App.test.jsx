import { describe, expect, } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import HobbyList from "./components/HobbyList";

import * as testData from '../saved-data/nichenu-default-rtdb-export.json'
import ChatRoom from "./components/ChatRoom";
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
// messagesRef = {
//   current: {
//     scrollIntoView: vi.fn()
//   }
// }
describe("Testing Loading", () => {

  it("Displays login page is loading", async () => {
    render(<App />);
    await screen.findByText("Loading data...");
  });

});

describe("Testing Login Page", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("Displays login page", async () => {
    // const mock = vi.fn().mockImplementation(useDbData)
    // console.log(mock.getMockImplementation())
    // expect(mock).toHaveBeenCalledOnce()
    await screen.findByText("Find your niche!");
    expect(screen.getByText("Find your niche!")).toBeDefined()
  });
});

describe("Testing Hobby Page", () => {
  beforeEach(() => {
    // console.log(testData.users)
    render(<App />);
  });

  it("Loads Hobby List", async () => {
    render(<HobbyList hobbyList={testData.hobbies ? Object.values(testData.hobbies).sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())) : []} user={Object.values(testData.users)[0]} openMessages={vi.fn()} setCurrDisplay={vi.fn()} />)
    await screen.findByText("My Hobbies");
    expect(screen.getByText("Agile Club")).toBeDefined()
  });

  //removing hobby from list 
  it("Removing Hobby From List", async () => {
    Object.values(testData.users)[0].hobby_ids = null
    render(<HobbyList hobbyList={testData.hobbies ? Object.values(testData.hobbies).sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())) : []} user={Object.values(testData.users)[0]} openMessages={vi.fn()} setCurrDisplay={vi.fn()} />)
    await screen.findByText("My Hobbies");
    expect(screen.getByText("Go join hobbies!")).toBeDefined()
  });
});

describe("Testing ChatRoom Page", () => {

  beforeEach(() => {
    // console.log(testData.users)
    render(<App />);
  });


  const user = Object.values(testData.users)[0]
  let hobby = {
    "desc": "Do agile meetings every day",
    "id": "3054c265-3558-a9f6-80a2-b5bd4928aab8",
    "img": "",
    "message_chat": {
      "id": "0a3fda76-8876-12ef-4763-0cc093349b29",
      "messages": {
        "3079e5d2-8684-fc68-26b3-730b6371b4ca": {
          "content": "fghjk",
          "date": "2023-02-10T16:44:08.566Z",
          "id": "3079e5d2-8684-fc68-26b3-730b6371b4ca",
          "user": "xXbxRnaNAZeRpUKz5eQ33cyUDZ12"
        },
        "57b73451-d3d6-576a-e4c0-e777094ce4ce": {
          "content": "Welcome to \"Agile Club\"!",
          "date": "2023-01-27T22:50:00.719Z",
          "id": "57b73451-d3d6-576a-e4c0-e777094ce4ce",
          "user": "kbQXH4rNQlVSH9RMs09A1eVGlvg1"
        },
        "b9e6d808-6c0d-a6e8-271e-72cec7d4cd64": {
          "content": "hey!",
          "date": "2023-02-10T16:44:34.194Z",
          "id": "b9e6d808-6c0d-a6e8-271e-72cec7d4cd64",
          "user": "VuQK69D9nYME46lrYEfm0JxBryW2"
        }
      },
      "users": {
        "111Ji2BQM3QrrQ5qajvdLOolSFz2": "111Ji2BQM3QrrQ5qajvdLOolSFz2",
        "525dsYXsYYeDNQinIpOiRSmRrTx1": "525dsYXsYYeDNQinIpOiRSmRrTx1",
        "VuQK69D9nYME46lrYEfm0JxBryW2": "VuQK69D9nYME46lrYEfm0JxBryW2",
        "kbQXH4rNQlVSH9RMs09A1eVGlvg1": "kbQXH4rNQlVSH9RMs09A1eVGlvg1",
        "lnZVF24IIHZ97J4yS1MKFGj4yGd2": "lnZVF24IIHZ97J4yS1MKFGj4yGd2",
        "xXbxRnaNAZeRpUKz5eQ33cyUDZ12": "xXbxRnaNAZeRpUKz5eQ33cyUDZ12"
      }
    },
    "name": "Agile Club",
    "owner": "kbQXH4rNQlVSH9RMs09A1eVGlvg1",
    "tags": [
      "video-games"
    ]
  }

  it("Renders Messages", async () => {
    render(<ChatRoom hobby={hobby} users={Object.values(testData.users)} user={user} setCurrDisplay={vi.fn()} />)
    await screen.findByText("Welcome to \"Agile Club\"!");
    expect(screen.getByText("Welcome to \"Agile Club\"!")).toBeDefined()
  });

  //removing hobby from list 
  it("Shows the new message", async () => {
    hobby.message_chat.messages = {
      "3079e5d2-8684-fc68-26b3-730b6371b4ca": {
        "content": "fghjk",
        "date": "2023-02-10T16:44:08.566Z",
        "id": "3079e5d2-8684-fc68-26b3-730b6371b4ca",
        "user": "xXbxRnaNAZeRpUKz5eQ33cyUDZ12"
      },
      "57b73451-d3d6-576a-e4c0-e777094ce4ce": {
        "content": "Welcome to \"Agile Club\"!",
        "date": "2023-01-27T22:50:00.719Z",
        "id": "57b73451-d3d6-576a-e4c0-e777094ce4ce",
        "user": "kbQXH4rNQlVSH9RMs09A1eVGlvg1"
      },
      "b9e6d808-6c0d-a6e8-271e-72cec7d4cd64": {
        "content": "hey!",
        "date": "2023-02-10T16:44:34.194Z",
        "id": "b9e6d808-6c0d-a6e8-271e-72cec7d4cd64",
        "user": "VuQK69D9nYME46lrYEfm0JxBryW2"
      },
      "b9e6d808-6c0d-a6e8-271e-72cec7qewqwed4cd64": {
        "content": "Never Gonna Give Up!",
        "date": "2024-02-10T16:44:34.194Z",
        "id": "b9e6d808-6c0d-a6e8-271e-72cec7qewqwed4cd64",
        "user": "VuQK69D9nYME46lrYEfm0JxBryW2"
      }
    }


    render(<ChatRoom hobby={hobby} users={Object.values(testData.users)} user={user} setCurrDisplay={vi.fn()} />)
    await screen.findByText("Welcome to \"Agile Club\"!");
    expect(screen.getByText("Never Gonna Give Up!")).toBeDefined()
  });
});