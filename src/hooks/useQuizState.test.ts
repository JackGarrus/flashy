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
    verb: "laufen",
    translation: "correre",
    example: "",
    category: "Movimento",
  },
]);

describe("useQuizState", () => {
  /* it("initializes with full verb list and correct currentCard", () => {
    const { result } = renderHook(() => useQuizState());
    expect(result.current.data.cards.length).toBeGreaterThan(0);
    expect(result.current.data.currentCard?.verb).toBe("essen");
  });

  it("tracks revealed and navigation state", () => {
    const { result } = renderHook(() => useQuizState());

    expect(result.current.data.revealed).toBe(false);
    act(() => {
      result.current.actions.setRevealed(true);
    });
    expect(result.current.data.revealed).toBe(true);

    act(() => {
      result.current.actions.goToNext();
    });

    expect(result.current.data.revealed).toBe(false);
  });

  it("handles mistakes and reviewMistakes reset", () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.mistakes.addMistake(result.current.data.currentCard!);
    });
    expect(result.current.mistakes.mistakes).toHaveLength(1);

    act(() => {
      result.current.actions.reviewMistakes();
    });

    expect(result.current.mistakes.mistakes).toHaveLength(0);
    expect(result.current.input.input).toBe("");
    expect(result.current.score.score).toBe(0);
    expect(result.current.lock.locked).toBe(false);
  });*/
});
