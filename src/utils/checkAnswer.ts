import { Verb } from "../types";

export function checkAnswer(
  input: string,
  card: Verb,
  reverse: boolean
): { isCorrect: boolean; expected: string } {
  const expected = reverse
    ? card.translation.toLowerCase()
    : card.verb.toLowerCase();
  const isCorrect = input.trim().toLowerCase() === expected;
  return { isCorrect, expected };
}
