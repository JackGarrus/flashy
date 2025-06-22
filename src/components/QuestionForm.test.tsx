import { render, screen, fireEvent } from "@testing-library/react";
import QuestionForm from "./QuestionForm";

describe("QuestionForm", () => {
  const baseProps = {
    input: "",
    onChange: jest.fn(),
    onSubmit: jest.fn((e) => e.preventDefault()),
    disabled: false,
    isInputEmpty: true,
    prompt: 'Come si dice "mangiare" in tedesco?',
    feedback: null,
    onNext: jest.fn(),
  };

  it("renders prompt and input correctly", () => {
    render(<QuestionForm {...baseProps} />);
    expect(screen.getByText(/come si dice/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    render(<QuestionForm {...baseProps} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "essen" } });
    expect(baseProps.onChange).toHaveBeenCalledWith("essen");
  });

  it("disables the Verifica button when input is empty", () => {
    render(<QuestionForm {...baseProps} isInputEmpty={true} />);
    const button = screen.getByRole("button", { name: /verifica/i });
    expect(button).toBeDisabled();
  });

  it("calls onSubmit when form is submitted", () => {
    render(<QuestionForm {...baseProps} isInputEmpty={false} />);
    const form = screen.getByLabelText("quiz-form");
    fireEvent.submit(form);
    expect(baseProps.onSubmit).toHaveBeenCalled();
  });

  it("shows feedback if present", () => {
    render(<QuestionForm {...baseProps} feedback="✅ Corretto!" />);
    expect(screen.getByText("✅ Corretto!")).toBeInTheDocument();
  });

  it("calls onNext when Prossima is clicked", () => {
    render(<QuestionForm {...baseProps} />);
    const nextBtn = screen.getByRole("button", { name: /prossima/i });
    fireEvent.click(nextBtn);
    expect(baseProps.onNext).toHaveBeenCalled();
  });
});
