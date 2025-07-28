import { TranslationDirection as TD, Verb } from "../../types";

export function getTranslationDirection(
  translationDirection: TD,
  index: number
) {
  const isReverse = translationDirection === "de-to-it";
  const isMixed = translationDirection === "mixed";
  const mixedReverse = isMixed ? index % 2 === 1 : isReverse;
  return { isReverse, isMixed, mixedReverse };
}

// Not sure why this is needed at all
export function getReverseTranslationDirection(
  translationDirection: TD,
  index: number,
  card: Verb
): string {
  const { mixedReverse } = getTranslationDirection(translationDirection, index);
  return mixedReverse
    ? `Cosa significa "${card.verb}" in italiano?`
    : `Come si dice "${card.translation}" in tedesco?`;
}
