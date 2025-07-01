import { renderHook, act } from "@testing-library/react";
import { useQuizActions } from "./useQuizActions";
import { Verb } from "../types";
import * as checkAnswerModule from "../utils/checkAnswer";

jest.useFakeTimers();

const mockVerb: Verb = {
  id: 1,
  verb: "essen",
  translation: "mangiare",
  example: "Ich esse einen Apfel.",
  category: "Mangiare",
};

describe("useQuizActions", () => {
  const setIndex = jest.fn();
  const setScore = jest.fn();
  const setInput = jest.fn();
  const setLocked = jest.fn();
  const addMistake = jest.fn();
  const clearMistakes = jest.fn();
  const goToNext = jest.fn();

  const setup = (input: string, card: Verb | undefined = mockVerb) =>
    renderHook(() =>
      useQuizActions({
        cards: [mockVerb],
        setIndex,
        currentCard: card,
        input,
        setInput,
        setLocked,
        setScore,
        addMistake,
        clearMistakes,
        goToNext,
      })
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not submit if input is empty", () => {
    const { result } = setup("");
    const setFeedback = jest.fn();

    const fakeEvent = { preventDefault: jest.fn() } as any;
    result.current.handleSubmit(fakeEvent, setFeedback, false);

    expect(setFeedback).not.toHaveBeenCalled();
    expect(setLocked).not.toHaveBeenCalled();
  });

  it("should handle correct answer", () => {
    jest
      .spyOn(checkAnswerModule, "checkAnswer")
      .mockReturnValue({ isCorrect: true, expected: "mangiare" });

    const { result } = setup("essen");
    const setFeedback = jest.fn();

    const fakeEvent = { preventDefault: jest.fn() } as any;
    result.current.handleSubmit(fakeEvent, setFeedback, false);

    expect(setLocked).toHaveBeenCalledWith(true);
    expect(setFeedback).toHaveBeenCalledWith("✅ Corretto!");
    expect(setScore).toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });

    expect(goToNext).toHaveBeenCalled();
    expect(setFeedback).toHaveBeenCalledWith(null);
  });

  it("should handle incorrect answer", () => {
    jest
      .spyOn(checkAnswerModule, "checkAnswer")
      .mockReturnValue({ isCorrect: false, expected: "mangiare" });

    const { result } = setup("laufen");
    const setFeedback = jest.fn();

    const fakeEvent = { preventDefault: jest.fn() } as any;
    result.current.handleSubmit(fakeEvent, setFeedback, false);

    expect(setLocked).toHaveBeenCalledWith(true);
    expect(setFeedback).toHaveBeenCalledWith(`❌ Sbagliato. Era "mangiare"`);
    expect(addMistake).toHaveBeenCalledWith(mockVerb);

    act(() => {
      jest.runAllTimers();
    });

    expect(setFeedback).toHaveBeenCalledWith(null);
    expect(setInput).toHaveBeenCalledWith("");
    expect(setLocked).toHaveBeenCalledWith(false);
  });

  it("reviewMistakes should reset everything", () => {
    const { result } = setup("qualcosa");
    result.current.reviewMistakes();

    expect(setIndex).toHaveBeenCalledWith(0);
    expect(setScore).toHaveBeenCalledWith(0);
    expect(setInput).toHaveBeenCalledWith("");
    expect(setLocked).toHaveBeenCalledWith(false);
    expect(clearMistakes).toHaveBeenCalled();
  });
});
