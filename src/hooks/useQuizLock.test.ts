import { renderHook, act } from "@testing-library/react";
import { useQuizLock } from "./useQuizLock";

describe("useQuizLock", () => {
  it("should initialize with locked = false", () => {
    const { result } = renderHook(() => useQuizLock());
    expect(result.current.locked).toBe(false);
  });

  it("should lock when lock() is called", () => {
    const { result } = renderHook(() => useQuizLock());

    act(() => {
      result.current.lock();
    });

    expect(result.current.locked).toBe(true);
  });

  it("should unlock when unlock() is called", () => {
    const { result } = renderHook(() => useQuizLock());

    act(() => {
      result.current.lock();
      result.current.unlock();
    });

    expect(result.current.locked).toBe(false);
  });

  it("should allow manual update via setLocked(true)", () => {
    const { result } = renderHook(() => useQuizLock());

    act(() => {
      result.current.setLocked(true);
    });

    expect(result.current.locked).toBe(true);
  });

  it("should allow manual update via setLocked(false)", () => {
    const { result } = renderHook(() => useQuizLock());

    act(() => {
      result.current.setLocked(true);
      result.current.setLocked(false);
    });

    expect(result.current.locked).toBe(false);
  });
});
