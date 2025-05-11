import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Quiz from "./Quiz";
import * as types from "../types";

jest.mock("../data/verbs.json", () => [
  {
    id: 1,
    verb: "essen",
    translation: "mangiare",
    example: "",
    category: "Mangiare",
  },
  {
    id: 2,
    verb: "gehen",
    translation: "andare",
    example: "",
    category: "Movimento",
  },
]);

describe("Quiz integration", () => {
  const baseProps: types.QuizProps = {
    selectedCategory: "Tutte",
    restrictToCategory: false,
    onlyFavorites: false,
    favorites: [],
  };

  it("renders the first question and allows correct answer", async () => {
    render(<Quiz {...baseProps} />);
    expect(screen.getByText(/come si dice/i)).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "essen" } });
    fireEvent.submit(screen.getByRole("form", { name: /quiz-form/i }));

    await screen.findByText("✅ Corretto!");
    await waitFor(
      () => expect(screen.queryByText("✅ Corretto!")).not.toBeInTheDocument(),
      { timeout: 1500 }
    );
  });

  it("shows feedback on wrong answer and tracks mistakes", async () => {
    render(<Quiz {...baseProps} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "falsch" } });
    fireEvent.submit(screen.getByRole("form", { hidden: true }));

    await screen.findByText(/❌ Sbagliato/);
    await screen.findByText(/Ripeti questi/);
  });

  it("switches mode correctly to DE → IT", () => {
    render(<Quiz {...baseProps} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "de-to-it" },
    });
    expect(screen.getByText(/cosa significa/i)).toBeInTheDocument();
  });

  it("alternates prompts in mixed mode", () => {
    render(<Quiz {...baseProps} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "mixed" },
    });

    const prompt1 = screen.getByText(/come si dice/i);
    expect(prompt1).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /prossima/i }));

    const prompt2 = screen.getByText(/cosa significa/i);
    expect(prompt2).toBeInTheDocument();
  });
});
