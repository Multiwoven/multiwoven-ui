import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp"; // Update the path based on your project structure

jest.mock("@/services/authentication", () => ({
  signUp: jest.fn().mockResolvedValue({
    data: {
      id: "mockToken",
      type: "string",
      attributes: { token: "mockToken" },
    },
  }),
}));

describe("SignUp Component", () => {
  it("renders signup form and handles submit", async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // dummy form values
    const companyName = "Test Company";
    const name = "Test User";
    const email = "test@example.com";
    const password = "password123";
    const confirmPassword = "password123";

    // form fields on change
    fireEvent.change(getByPlaceholderText("Company Name"), {
      target: { value: companyName },
    });
    fireEvent.change(getByPlaceholderText("Name"), {
      target: { value: name },
    });
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: password },
    });
    fireEvent.change(getByPlaceholderText("Confirm Password"), {
      target: { value: confirmPassword },
    });

    // click on sign up
    fireEvent.click(getByText("Sign up"));

    // Verify the expected outcome after the API call
    await waitFor(() => {
      expect(window.location.pathname).toBe("/"); // Update the expected path if necessary
    });
  });
});