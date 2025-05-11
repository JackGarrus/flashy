import { renderHook, act } from "@testing-library/react";
import { useQuizState } from "./useQuizState";

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
  {
    id: 3,
    verb: "sehen",
    translation: "vedere",
    example: "",
    category: "Vedere",
  },
]);

describe("useQuizState", () => {
  const baseArgs = {
    selectedCategory: "Tutte",
    restrictToCategory: false,
    onlyFavorites: false,
    favorites: [],
  };

  it("initializes with full verb list", () => {
    const { result } = renderHook(() =>
      useQuizState(
        baseArgs.selectedCategory,
        baseArgs.restrictToCategory,
        baseArgs.onlyFavorites,
        baseArgs.favorites
      )
    );

    expect(result.current.cards.length).toBe(3);
    expect(result.current.index).toBe(0);
    expect(result.current.input).toBe("");
    expect(result.current.locked).toBe(false);
    expect(result.current.mistakes).toEqual([]);
  });

  it("can go to next card and reset input", () => {
    const { result } = renderHook(() =>
      useQuizState(
        baseArgs.selectedCategory,
        baseArgs.restrictToCategory,
        baseArgs.onlyFavorites,
        baseArgs.favorites
      )
    );

    act(() => {
      result.current.setInput("qualcosa");
      result.current.goToNext();
    });

    expect(result.current.index).toBe(1);
    expect(result.current.input).toBe("");
  });

  it("loads only mistakes on reviewMistakes()", () => {
    const { result } = renderHook(() =>
      useQuizState(
        baseArgs.selectedCategory,
        baseArgs.restrictToCategory,
        baseArgs.onlyFavorites,
        baseArgs.favorites
      )
    );

    const mistaken = result.current.cards[1];

    act(() => {
      result.current.setMistakes([mistaken]);
    });

    act(() => {
      result.current.reviewMistakes();
    });

    expect(result.current.cards.length).toBe(1);
    expect(result.current.cards[0].verb).toBe(mistaken.verb);
    expect(result.current.index).toBe(0);
  });
});
