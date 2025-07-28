import { render, screen, fireEvent } from "@testing-library/react";
import RadioButtonGroup from "./RadioButtonGroup";

describe("RadioButtonGroup", () => {
  const OPTIONS = [
    { label: "Flashcard", value: "flashcard" },
    { label: "Quiz", value: "quiz" },
  ];

  const baseProps = {
    name: "mode",
    options: OPTIONS,
    selected: "quiz",
    onChange: jest.fn(),
    label: "Modalità",
  };

  beforeEach(() => {
    baseProps.onChange.mockClear();
  });

  it("renders the group label and all options", () => {
    render(<RadioButtonGroup {...baseProps} />);
    expect(screen.getByText(/modalità/i)).toBeInTheDocument();
    OPTIONS.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  it("marks the correct radio as selected", () => {
    render(<RadioButtonGroup {...baseProps} />);
    const quizRadio = screen.getByDisplayValue("quiz") as HTMLInputElement;
    expect(quizRadio.checked).toBe(true);
  });

  it("calls onChange with the correct value when clicked", () => {
    render(<RadioButtonGroup {...baseProps} />);
    const flashcardRadio = screen.getByDisplayValue("flashcard");
    fireEvent.click(flashcardRadio);
    expect(baseProps.onChange).toHaveBeenCalledWith("flashcard");
  });
});
