import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

jest.mock("./data/verbs.json", () => [
  {
    id: 1,
    verb: "essen",
    translation: "mangiare",
    example: "",
    category: "Mangiare",
  },
]);

describe("App component", () => {
  it("renders ControlPanel and FlashcardViewer by default", () => {
    render(<App />);

    expect(
      screen.getByLabelText(/categoria/i) || screen.getByText(/categoria/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText("←") || screen.getByRole("button", { name: /←/ })
    ).toBeInTheDocument();
  });

  it("switches to Quiz mode when selected", () => {
    render(<App />);

    fireEvent.click(screen.getByLabelText("Quiz"));

    expect(
      screen.getByRole("form", { name: /quiz-form/i }) ||
        screen.getByText(/come si dice/i)
    ).toBeInTheDocument();
  });
});
