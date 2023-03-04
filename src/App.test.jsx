import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { useDbData, useDbUpdate, useAuth } from "./utils/firebase";
import data from "./TestData";
import { when } from "jest-when";

// vi.mock("./utils/user");
// vi.mock("./utils/firebase.js");
vi.mock("./utils/firebase", async () => {
  const original = await vi.importActual("./utils/firebase");
  return {
    ...original,
    useDbData: vi.fn(),
    useAuth: vi.fn(),
  };
});

const testProfile = {
  displayName: "testUser",
  email: "testUser@northwestern.edu",
  profilePic: "https://illustoon.com/photo/590.png",
};


describe("Without Authentication", () => {
  beforeEach(() => {
    useAuth.mockReturnValue([]);
    useDbData.mockReturnValue([data])
  });

  it("Displays login page is loading", async () => {
    render(<App />);
    await screen.findByText("Loading data...");
  });
});

describe("With Authentication", () => {
  beforeEach(() => {
    useAuth.mockReturnValue([]);
    useDbData.mockReturnValue([data])
  });

  it("Can see the logout button after being signed in", async () => {
    render(<App />);
    await screen.getByText("Logout");
  });

  it("Displays mock event data", async () => {
    render(<App />);
    await screen.getByText("Anime");
  });
});