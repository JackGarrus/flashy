import { renderHook, act } from "@testing-library/react";
import { useFlashcardNavigator } from "./useFlashcardNavigator";

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

describe("useFlashcardNavigator", () => {
  it("should return all cards when category is 'Tutte'", () => {
    const { result } = renderHook(() => useFlashcardNavigator("Tutte", []));
    expect(result.current.current).toEqual(
      expect.objectContaining({ verb: "essen" })
    );
    expect(result.current.hasCards).toBe(true);
  });

  it("should filter by selected category", () => {
    const { result } = renderHook(() => useFlashcardNavigator("Movimento", []));
    expect(result.current.current?.verb).toBe("laufen");
  });

  it("should filter by favorites if category is 'Preferiti'", () => {
    const { result } = renderHook(() =>
      useFlashcardNavigator("Preferiti", [3])
    );
    expect(result.current.current?.verb).toBe("sprechen");
    expect(result.current.isFavorite).toBe(true);
  });

  it("should return null if no matching cards", () => {
    const { result } = renderHook(() => useFlashcardNavigator("Casa", []));
    expect(result.current.current).toBe(null);
    expect(result.current.hasCards).toBe(false);
  });

  it("should cycle next and reset revealed", () => {
    const { result } = renderHook(() => useFlashcardNavigator("Tutte", []));
    act(() => {
      result.current.setRevealed(true);
      result.current.next();
    });
    expect(result.current.revealed).toBe(false);
    expect(result.current.current?.verb).toBe("laufen");
  });

  it("should cycle prev and reset revealed", () => {
    const { result } = renderHook(() => useFlashcardNavigator("Tutte", []));
    act(() => {
      result.current.prev(); // from index 0 → wrap to last
    });
    expect(result.current.revealed).toBe(false);
    expect(result.current.current?.verb).toBe("sprechen");
  });
});
