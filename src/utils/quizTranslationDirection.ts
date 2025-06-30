import { QuizTranslationDirection, Verb } from "../types";

export function getQuizDirection(
  translationDirection: QuizTranslationDirection,
  index: number
) {
  const isReverse = translationDirection === "de-to-it";
  const isMixed = translationDirection === "mixed";
  const mixedReverse = isMixed ? index % 2 === 1 : isReverse;
  return { isReverse, isMixed, mixedReverse };
}

export function getReverseTranslationDirection(
  translationDirection: QuizTranslationDirection,
  index: number,
  card: Verb
): string {
  const { mixedReverse } = getQuizDirection(translationDirection, index);
  return mixedReverse
    ? `Cosa significa "${card.verb}" in italiano?`
    : `Come si dice "${card.translation}" in tedesco?`;
}
