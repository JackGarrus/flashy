import { renderHook } from "@testing-library/react";
import { useFlashcardFilter } from "./useFlashcardFilter";

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
    verb: "laufen",
    translation: "correre",
    example: "",
    category: "Movimento",
  },
  {
    id: 3,
    verb: "sprechen",
    translation: "parlare",
    example: "",
    category: "Comunicazione",
  },
]);

describe("useFlashcardFilter", () => {
  it("returns all cards when category is 'Tutte'", () => {
    const { result } = renderHook(() => useFlashcardFilter("Tutte", []));
    expect(result.current.filteredCards).toHaveLength(3);
    expect(result.current.hasCards).toBe(true);
  });

  it("filters cards by category", () => {
    const { result } = renderHook(() => useFlashcardFilter("Movimento", []));
    expect(result.current.filteredCards).toHaveLength(1);
    expect(result.current.filteredCards[0].verb).toBe("laufen");
  });

  it("filters cards by favorites when category is 'Preferiti'", () => {
    const { result } = renderHook(() => useFlashcardFilter("Preferiti", [3]));
    expect(result.current.filteredCards).toHaveLength(1);
    expect(result.current.filteredCards[0].verb).toBe("sprechen");
  });

  it("returns empty list if no cards match", () => {
    const { result } = renderHook(() => useFlashcardFilter("Casa", []));
    expect(result.current.filteredCards).toHaveLength(0);
    expect(result.current.hasCards).toBe(false);
  });
});
