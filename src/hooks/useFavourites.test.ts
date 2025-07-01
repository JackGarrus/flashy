import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "./useFavorites";

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("should initialize with empty favorites if none in localStorage", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favoriteIds).toEqual([]);
  });

  it("should initialize with data from localStorage", () => {
    localStorage.setItem("favorites", JSON.stringify([1, 2, 3]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favoriteIds).toEqual([1, 2, 3]);
  });

  it("should add a favorite", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.updateFavoriteIds(42);
    });

    expect(result.current.favoriteIds).toEqual([42]);
  });

  it("should remove a favorite if already present", () => {
    localStorage.setItem("favorites", JSON.stringify([1, 2]));
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.updateFavoriteIds(2);
    });

    expect(result.current.favoriteIds).toEqual([1]);
  });

  it("should persist to localStorage when favorites change", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.updateFavoriteIds(99);
    });

    expect(setItemSpy).toHaveBeenCalledWith("favorites", JSON.stringify([99]));
  });
});
