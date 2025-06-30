import { renderHook } from "@testing-library/react";
import { useQuizData } from "./useQuizData";
import * as filters from "../utils/filters";
import verbs from "../data/verbs.json";
import { Verb } from "../types";

jest.mock("../data/verbs.json", () => [
  {
    id: 1,
    verb: "essen",
    translation: "mangiare",
    example: "Ich esse einen Apfel.",
    category: "Mangiare",
  },
  {
    id: 2,
    verb: "gehen",
    translation: "andare (a piedi)",
    example: "Ich gehe zur Schule.",
    category: "Movimento",
  },
]);

describe("useQuizData", () => {
  const mockFilter = jest.spyOn(filters, "filterVerbs");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize cards and index based on filterVerbs result", () => {
    const mockResult: Verb[] = [
      {
        id: 2,
        verb: "gehen",
        translation: "andare (a piedi)",
        example: "Ich gehe zur Schule.",
        category: "Movimento",
      },
      {
        id: 1,
        verb: "essen",
        translation: "mangiare",
        example: "Ich esse einen Apfel.",
        category: "Mangiare",
      },
    ];

    mockFilter.mockReturnValue(mockResult);

    const { result } = renderHook(() =>
      useQuizData("motion", true, false, [1])
    );

    expect(mockFilter).toHaveBeenCalledWith(verbs, "motion", true, false, [1]);

    expect(result.current.cards).toEqual(mockResult);
    expect(result.current.index).toBe(0);
    expect(result.current.currentCard).toEqual(mockResult[0]);
  });

  it("should reset index when dependencies change", () => {
    const firstMock: Verb[] = [
      {
        id: 1,
        verb: "sprechen",
        translation: "parlare",
        example: "Ich spreche Deutsch.",
        category: "Comunicazione",
      },
    ];
    const secondMock: Verb[] = [
      {
        id: 2,
        verb: "lesen",
        translation: "leggere",
        example: "Ich lese ein Buch.",
        category: "Tempo libero",
      },
    ];

    mockFilter.mockReturnValueOnce(firstMock).mockReturnValueOnce(secondMock);

    const { result, rerender } = renderHook(
      ({ category }) => useQuizData(category, true, false, [1, 2]),
      {
        initialProps: { category: "Comunicazione" },
      }
    );

    expect(result.current.cards).toEqual(firstMock);
    expect(result.current.index).toBe(0);
    expect(result.current.currentCard).toEqual(firstMock[0]);

    rerender({ category: "Tempo libero" });

    expect(mockFilter).toHaveBeenLastCalledWith(
      verbs,
      "Tempo libero",
      true,
      false,
      [1, 2]
    );
    expect(result.current.cards).toEqual(secondMock);
    expect(result.current.index).toBe(0);
    expect(result.current.currentCard).toEqual(secondMock[0]);
  });

  it("should allow updating the index manually", () => {
    const mockData: Verb[] = [
      {
        id: 3,
        verb: "trinken",
        translation: "bere",
        example: "Ich trinke Wasser.",
        category: "Mangiare",
      },
      {
        id: 4,
        verb: "wohnen",
        translation: "abitare",
        example: "Ich wohne in Berlin.",
        category: "Casa",
      },
    ];

    mockFilter.mockReturnValue(mockData);

    const { result } = renderHook(() =>
      useQuizData("Mangiare", false, false, [])
    );

    expect(result.current.index).toBe(0);
    expect(result.current.currentCard).toEqual(mockData[0]);

    result.current.setIndex(1);

    expect(result.current.index).toBe(1);
    expect(result.current.currentCard).toEqual(mockData[1]);
  });
});
