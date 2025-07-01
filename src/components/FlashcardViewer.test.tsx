import { render, screen, fireEvent } from "@testing-library/react";
import FlashcardViewer from "./FlashcardViewer";

jest.mock("../data/verbs.json", () => [
  {
    id: 1,
    verb: "essen",
    translation: "mangiare",
    example: "Ich esse einen Apfel.",
    category: "Mangiare",
  },
  {
    id: 2,
    verb: "laufen",
    translation: "correre",
    example: "Ich laufe jeden Morgen.",
    category: "Movimento",
  },
]);

describe("FlashcardViewer", () => {
  it("renders a flashcard and handles navigation", async () => {
    const toggleFavorite = jest.fn();

    render(
      <FlashcardViewer
        selectedCategory="Tutte"
        favorites={[]}
        onupdateFavoriteIds={toggleFavorite}
      />
    );

    expect(screen.getByText("Ich esse einen Apfel.")).toBeInTheDocument();

    fireEvent.click(screen.getByText("→"));

    expect(screen.getByText("Ich laufe jeden Morgen.")).toBeInTheDocument();
  });

  it("shows fallback message when no cards are available", () => {
    render(
      <FlashcardViewer
        selectedCategory="Casa"
        favorites={[]}
        onupdateFavoriteIds={() => {}}
      />
    );

    expect(
      screen.getByText("Nessuna flashcard disponibile.")
    ).toBeInTheDocument();
  });
});
