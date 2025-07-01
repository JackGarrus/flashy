import { renderHook, act } from "@testing-library/react";
import { useFlashcardNavigator } from "./useFlashcardNavigator";

const mockCards = [
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
];

describe("useFlashcardNavigator", () => {
  it("should return the first card and hasCards true", () => {
    const { result } = renderHook(() => useFlashcardNavigator(mockCards, []));
    expect(result.current.current).toEqual(
      expect.objectContaining({ verb: "essen" })
    );
    expect(result.current.hasCards).toBe(true);
  });

  it("should return null if filteredCards is empty", () => {
    const { result } = renderHook(() => useFlashcardNavigator([], []));
    expect(result.current.current).toBe(null);
    expect(result.current.hasCards).toBe(false);
  });

  it("should mark current card as favorite if ID is in favoriteIds", () => {
    const { result } = renderHook(() => useFlashcardNavigator(mockCards, [1]));
    expect(result.current.isFavorite).toBe(true);
  });

  it("should go to next card and reset revealed", () => {
    const { result } = renderHook(() => useFlashcardNavigator(mockCards, []));
    act(() => {
      result.current.setRevealed(true);
      result.current.next();
    });
    expect(result.current.revealed).toBe(false);
    expect(result.current.current?.verb).toBe("laufen");
  });

  it("should go to previous card and reset revealed", () => {
    const { result } = renderHook(() => useFlashcardNavigator(mockCards, []));
    act(() => {
      result.current.prev();
    });
    expect(result.current.revealed).toBe(false);
    expect(result.current.current?.verb).toBe("sprechen");
  });
});
