import { renderHook, act } from "@testing-library/react";
import { useCategoryFilter } from "./useCategoryFilter";

describe("useCategoryFilter", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCategoryFilter());

    expect(result.current.selectedCategory).toBe("Tutte");
    expect(result.current.restrictToCategory).toBe(false);
    expect(result.current.categories).toContain("Preferiti");
  });

  it("should update selected category", () => {
    const { result } = renderHook(() => useCategoryFilter());

    act(() => {
      result.current.setSelectedCategory("Mangiare");
    });

    expect(result.current.selectedCategory).toBe("Mangiare");
  });

  it("should update restrictToCategory", () => {
    const { result } = renderHook(() => useCategoryFilter());

    act(() => {
      result.current.setRestrictToCategory(true);
    });

    expect(result.current.restrictToCategory).toBe(true);
  });

  it("should include all predefined categories", () => {
    const { result } = renderHook(() => useCategoryFilter());

    const expected = [
      "Tutte",
      "Preferiti",
      "Mangiare",
      "Movimento",
      "Comunicazione",
      "Tempo libero",
      "Casa",
      "Lavoro",
      "Scuola",
    ];

    expect(result.current.categories).toEqual(expected);
  });
});
