import { Verb, QuizMode } from "../types";

export function getQuizDirection(mode: QuizMode, index: number) {
  const isReverse = mode === "de-to-it";
  const isMixed = mode === "mixed";
  const mixedReverse = isMixed ? index % 2 === 1 : isReverse;
  return { isReverse, isMixed, mixedReverse };
}

export function getPrompt(mode: QuizMode, index: number, card: Verb): string {
  const { mixedReverse } = getQuizDirection(mode, index);
  return mixedReverse
    ? `Cosa significa "${card.verb}" in italiano?`
    : `Come si dice "${card.translation}" in tedesco?`;
}
