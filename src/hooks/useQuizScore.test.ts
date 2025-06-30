import { renderHook, act } from "@testing-library/react";
import { useQuizScore } from "./useQuizScore";

describe("useQuizScore", () => {
  it("should initialize with score = 0", () => {
    const { result } = renderHook(() => useQuizScore());
    expect(result.current.score).toBe(0);
  });

  it("should allow manually updating score with setScore", () => {
    const { result } = renderHook(() => useQuizScore());

    act(() => {
      result.current.setScore(5);
    });

    expect(result.current.score).toBe(5);
  });

  it("should reset score to 0 with resetScore", () => {
    const { result } = renderHook(() => useQuizScore());

    act(() => {
      result.current.setScore(10);
      result.current.resetScore();
    });

    expect(result.current.score).toBe(0);
  });
});
