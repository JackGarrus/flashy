import { renderHook, act } from "@testing-library/react";
import { useQuizTranslationDirection } from "./useQuizTranslationDirection";

describe("useQuizTranslationDirection", () => {
  it("should initialize with default mode 'it-to-de'", () => {
    const { result } = renderHook(() => useQuizTranslationDirection());
    expect(result.current.translationDirection).toBe("it-to-de");
  });

  it("should initialize with provided valid mode", () => {
    const { result } = renderHook(() =>
      useQuizTranslationDirection("de-to-it")
    );
    expect(result.current.translationDirection).toBe("de-to-it");
  });

  it("should default to 'it-to-de' if initialized with invalid mode", () => {
    const { result } = renderHook(() => useQuizTranslationDirection("banana"));
    expect(result.current.translationDirection).toBe("it-to-de");
  });

  it("should update the mode when setMode is called with a valid mode", () => {
    const { result } = renderHook(() => useQuizTranslationDirection());

    act(() => {
      result.current.setTranslationDirection("mixed");
    });

    expect(result.current.translationDirection).toBe("mixed");
  });

  it("should not update the mode when setMode is called with an invalid mode", () => {
    const { result } = renderHook(() =>
      useQuizTranslationDirection("it-to-de")
    );

    act(() => {
      result.current.setTranslationDirection("invalid-mode");
    });

    expect(result.current.translationDirection).toBe("it-to-de");
  });

  it("should warn when initialized with invalid mode", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    renderHook(() => useQuizTranslationDirection("invalid"));
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Invalid quiz mode")
    );
    warnSpy.mockRestore();
  });
});
