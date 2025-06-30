import { render, screen, fireEvent } from "@testing-library/react";
import QuizModeSelector from "./QuizTranslationDirectionSelector";

describe("QuizModeSelector", () => {
  it("renders all mode options and reflects selected value", () => {
    render(<QuizModeSelector onModeChange={jest.fn()} />);
    expect(screen.getByLabelText(/modalità/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("it-to-de");
  });

  it("calls setMode on change", () => {
    const setMode = jest.fn();
    render(<QuizModeSelector onModeChange={setMode} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "mixed" },
    });
    expect(setMode).toHaveBeenCalledWith("mixed");
  });

  it("renders all available mode options", () => {
    render(<QuizModeSelector onModeChange={jest.fn()} />);
    expect(
      screen.getByRole("option", { name: /IT → DE/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /DE → IT/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Mista/i })).toBeInTheDocument();
  });
});
