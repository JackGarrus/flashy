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
    showOnlyFavourites: false,
    favorites: [],
  };

  it("initializes with full verb list", () => {
    const { result } = renderHook(() =>
      useQuizState(
        baseArgs.selectedCategory,
        baseArgs.restrictToCategory,
        baseArgs.showOnlyFavourites,
        baseArgs.favorites
      )
    );

    expect(result.current.data.cards.length).toBe(3);
    expect(result.current.data.index).toBe(0);
    expect(result.current.input.input).toBe("");
    expect(result.current.lock.locked).toBe(false);
    expect(result.current.mistakes.mistakes).toEqual([]);
  });

  it("can go to next card and reset input", () => {
    const { result } = renderHook(() =>
      useQuizState(
        baseArgs.selectedCategory,
        baseArgs.restrictToCategory,
        baseArgs.showOnlyFavourites,
        baseArgs.favorites
      )
    );

    act(() => {
      result.current.input.setInput("qualcosa");
      result.current.actions.goToNext();
    });

    expect(result.current.data.index).toBe(1);
    expect(result.current.input.input).toBe("");
  });

  it("loads only mistakes on reviewMistakes()", () => {
    const { result } = renderHook(() =>
      useQuizState(
        baseArgs.selectedCategory,
        baseArgs.restrictToCategory,
        baseArgs.showOnlyFavourites,
        baseArgs.favorites
      )
    );

    const mistaken = result.current.data.cards[1];

    act(() => {
      result.current.mistakes.setMistakes([mistaken]);
    });

    act(() => {
      result.current.actions.reviewMistakes();
    });

    expect(result.current.data.cards.length).toBe(1);
    expect(result.current.data.cards[0].verb).toBe(mistaken.verb);
    expect(result.current.data.index).toBe(0);
  });
});
