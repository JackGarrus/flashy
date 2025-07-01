import { render, screen, fireEvent } from "@testing-library/react";
import Flashcard from "./Flashcard";

beforeAll(() => {
  global.speechSynthesis = {
    speak: jest.fn(),
  } as unknown as SpeechSynthesis;
});

describe("Flashcard", () => {
  const baseProps = {
    verb: "sprechen",
    translation: "parlare",
    example: "Ich spreche Deutsch.",
    revealed: false,
    onReveal: jest.fn(),
    isFavorite: false,
    updateFavoritesIds: jest.fn(),
  };

  it("renders verb and favorite button", () => {
    render(<Flashcard {...baseProps} />);

    expect(screen.getByText("sprechen")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "☆" })).toBeInTheDocument();
  });

  it("calls onReveal when 'Mostra significato' is clicked", () => {
    render(<Flashcard {...baseProps} />);
    fireEvent.click(screen.getByText("Mostra significato"));
    expect(baseProps.onReveal).toHaveBeenCalled();
  });

  it("calls updateFavoritesIds when favorite button is clicked", () => {
    render(<Flashcard {...baseProps} />);
    fireEvent.click(screen.getByRole("button", { name: "☆" }));
    expect(baseProps.updateFavoritesIds).toHaveBeenCalled();
  });

  it("shows translation and example when revealed is true", () => {
    render(<Flashcard {...baseProps} revealed={true} />);
    expect(screen.getByText("Traduzione: parlare")).toBeInTheDocument();
    expect(screen.getByText("Ich spreche Deutsch.")).toBeInTheDocument();
  });

  it("calls speech synthesis on pronunciation click", () => {
    render(<Flashcard {...baseProps} />);
    fireEvent.click(screen.getByText("🔊 Pronuncia"));
    expect(global.speechSynthesis.speak).toHaveBeenCalled();
  });
});
