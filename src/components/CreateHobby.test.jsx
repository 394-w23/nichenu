import { describe, expect, } from "vitest";
import { fireEvent, getAllByTestId, getByPlaceholderText, getByTestId, getByText, render, screen } from "@testing-library/react";
import App from "../App";
import * as testData from '../../saved-data/nichenu-default-rtdb-export.json'
import CreateHobby from "./CreateHobby";


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


describe("Testing Hobby error handling", () => {

    it("should throw missing fields error", () => {
        let user = Object.values(testData.users)[0]
        render(<CreateHobby user={user} setCurrDisplay={vi.fn()} />)
        const create_hobby_button = screen.getByText("Submit");
        fireEvent.click(create_hobby_button);
        expect(screen.getByText("Missing Fields")).toBeDefined()
    })

});
