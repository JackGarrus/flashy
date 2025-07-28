import { renderHook, act } from "@testing-library/react";
import { useMistakes } from "./useMistakes";
import { Verb } from "../../types";

const sampleVerb: Verb = {
  id: 1,
  verb: "essen",
  translation: "mangiare",
  example: "Ich esse einen Apfel.",
  category: "Mangiare",
};

const anotherVerb: Verb = {
  id: 2,
  verb: "laufen",
  translation: "correre",
  example: "Ich laufe jeden Tag.",
  category: "Movimento",
};

describe("useMistakes", () => {
  it("starts with an empty list", () => {
    const { result } = renderHook(() => useMistakes());
    expect(result.current.mistakes).toEqual([]);
  });

  // però questo test non controlla se l'input è sbagliato
  it("adds a new mistake", () => {
    const { result } = renderHook(() => useMistakes());

    act(() => {
      result.current.addMistake(sampleVerb);
    });

    expect(result.current.mistakes).toEqual([sampleVerb]);
  });

  it("does not add the same mistake twice", () => {
    const { result } = renderHook(() => useMistakes());

    act(() => {
      result.current.addMistake(sampleVerb);
      result.current.addMistake(sampleVerb);
    });

    expect(result.current.mistakes).toEqual([sampleVerb]);
  });

  it("adds multiple different mistakes", () => {
    const { result } = renderHook(() => useMistakes());

    act(() => {
      result.current.addMistake(sampleVerb);
      result.current.addMistake(anotherVerb);
    });

    expect(result.current.mistakes).toEqual([sampleVerb, anotherVerb]);
  });

  it("removes a mistake by ID", () => {
    const { result } = renderHook(() => useMistakes());

    act(() => {
      result.current.addMistake(sampleVerb);
      result.current.removeMistake(sampleVerb.id);
    });

    expect(result.current.mistakes).toEqual([]);
  });

  // questa funzionalità non sta venendo usata
  it("clears all mistakes", () => {
    const { result } = renderHook(() => useMistakes());

    act(() => {
      result.current.addMistake(sampleVerb);
      result.current.addMistake(anotherVerb);
      result.current.clearMistakes();
    });

    expect(result.current.mistakes).toEqual([]);
  });
});
