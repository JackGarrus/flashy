import { renderHook, act } from "@testing-library/react";
import { useTranslationDirection } from "./useTranslationDirection";
import { QuizTranslationDirection } from "../../types";

describe("useTranslationDirection", () => {
  it("should initialize with default value 'it-to-de'", () => {
    const { result } = renderHook(() => useTranslationDirection());
    expect(result.current.translationDirection).toBe("it-to-de");
  });

  it("should initialize with provided valid translation direction", () => {
    const { result } = renderHook(() => useTranslationDirection("de-to-it"));
    expect(result.current.translationDirection).toBe("de-to-it");
  });

  it("should default to 'it-to-de' if initialized with invalid translation direction option", () => {
    const { result } = renderHook(() =>
      useTranslationDirection("banana" as QuizTranslationDirection)
    );
    expect(result.current.translationDirection).toBe("it-to-de");
  });

  it("should update the translation direction value when setTranslationDirection is called with a valid option", () => {
    const { result } = renderHook(() => useTranslationDirection());

    act(() => {
      result.current.setTranslationDirection("mixed");
    });

    expect(result.current.translationDirection).toBe("mixed");
  });

  it("should not update the translation direction value when setTranslationDirection is called with an invalid option", () => {
    const { result } = renderHook(() => useTranslationDirection("it-to-de"));

    act(() => {
      result.current.setTranslationDirection("invalid-td");
    });

    expect(result.current.translationDirection).toBe("it-to-de");
  });

  it("should warn when initialized with invalid translation direction option", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    renderHook(() =>
      useTranslationDirection("invalid" as QuizTranslationDirection)
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Invalid quiz translation direction")
    );
    warnSpy.mockRestore();
  });
});
