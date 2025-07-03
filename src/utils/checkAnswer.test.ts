import { checkAnswer } from "./checkAnswer";
import { Verb } from "../types";

describe("checkAnswer", () => {
  const card: Verb = {
    id: 1,
    verb: "essen",
    translation: "mangiare",
    example: "Ich esse einen Apfel.",
    category: "Mangiare",
  };

  it("returns isCorrect true when input matches verb (normal direction)", () => {
    const result = checkAnswer("essen", card, false);
    expect(result.isCorrect).toBe(true);
    expect(result.expected).toBe("essen");
  });

  it("returns isCorrect false when input does not match verb (normal direction)", () => {
    const result = checkAnswer("gehen", card, false);
    expect(result.isCorrect).toBe(false);
    expect(result.expected).toBe("essen");
  });

  it("returns isCorrect true when input matches translation (reverse)", () => {
    const result = checkAnswer("mangiare", card, true);
    expect(result.isCorrect).toBe(true);
    expect(result.expected).toBe("mangiare");
  });

  it("trims and lowers input before checking", () => {
    const result = checkAnswer("  Mangiare  ", card, true);
    expect(result.isCorrect).toBe(true);
  });

  it("returns false if empty or whitespace only", () => {
    const result = checkAnswer("   ", card, false);
    expect(result.isCorrect).toBe(false);
  });
});
