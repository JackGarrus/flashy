import {
  getQuizDirection,
  getReverseTranslationDirection,
} from "./quizTranslationDirection";
import { Verb } from "../types";

describe("getQuizDirection", () => {
  it("returns correct flags for de-to-it", () => {
    expect(getQuizDirection("de-to-it", 0)).toEqual({
      isReverse: true,
      isMixed: false,
      mixedReverse: true,
    });
  });

  it("returns correct flags for it-to-de", () => {
    expect(getQuizDirection("it-to-de", 0)).toEqual({
      isReverse: false,
      isMixed: false,
      mixedReverse: false,
    });
  });

  it("alternates in mixed mode", () => {
    expect(getQuizDirection("mixed", 0).mixedReverse).toBe(false);
    expect(getQuizDirection("mixed", 1).mixedReverse).toBe(true);
  });
});

describe("getReverseTranslationDirection", () => {
  const card: Verb = {
    id: 1,
    verb: "essen",
    translation: "mangiare",
    example: "",
    category: "Mangiare",
  };

  it("generates correct prompt for reverse direction", () => {
    const result = getReverseTranslationDirection("de-to-it", 0, card);
    expect(result).toBe('Cosa significa "essen" in italiano?');
  });

  it("generates correct prompt for normal direction", () => {
    const result = getReverseTranslationDirection("it-to-de", 0, card);
    expect(result).toBe('Come si dice "mangiare" in tedesco?');
  });

  it("alternates prompt in mixed mode", () => {
    expect(getReverseTranslationDirection("mixed", 0, card)).toBe(
      'Come si dice "mangiare" in tedesco?'
    );
    expect(getReverseTranslationDirection("mixed", 1, card)).toBe(
      'Cosa significa "essen" in italiano?'
    );
  });
});
