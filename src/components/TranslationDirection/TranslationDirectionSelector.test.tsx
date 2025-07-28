import { render, screen, fireEvent } from "@testing-library/react";
import TranslationDirectionSelector from "./TranslationDirectionSelector";

describe("TranslationDirectionSelector", () => {
  it("renders all mode options and reflects selected value", () => {
    render(<TranslationDirectionSelector onModeChange={jest.fn()} />);
    expect(screen.getByLabelText(/modalità/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("it-to-de");
  });

  it("calls setMode on change", () => {
    const setMode = jest.fn();
    render(<TranslationDirectionSelector onModeChange={setMode} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "mixed" },
    });
    expect(setMode).toHaveBeenCalledWith("mixed");
  });

  it("renders all available mode options", () => {
    render(<TranslationDirectionSelector onModeChange={jest.fn()} />);
    expect(
      screen.getByRole("option", { name: /IT → DE/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /DE → IT/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Mista/i })).toBeInTheDocument();
  });
});
