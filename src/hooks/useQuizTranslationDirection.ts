import { useState } from "react";
import { QuizTranslationDirection } from "../types";
import { QUIZ_DIRECTIONS } from "../consts";

/* isValueValidTranslationDirection is a validation of custom types used to prevent that the
 * string passed to this hook corresponds
 * to the following 3 options and no others.
 * This is to prevent unsafe casts: useQuizTranslationDirection("string" as QuizDirection) (see tests)
 */
const isValueValidTranslationDirection = (
  val: any
): val is QuizTranslationDirection => QUIZ_DIRECTIONS.includes(val);

export function useQuizTranslationDirection(
  initialTranslationDirection: QuizTranslationDirection = "it-to-de"
) {
  const [translationDirection, setTranslationDirectionInternal] =
    useState<QuizTranslationDirection>(
      isValueValidTranslationDirection(initialTranslationDirection)
        ? initialTranslationDirection
        : "it-to-de"
    );

  const setTranslationDirection = (val: any) => {
    if (isValueValidTranslationDirection(val)) {
      setTranslationDirectionInternal(val);
    } else {
      console.warn(
        `Invalid quiz translation direction "${val}" ignored. Defaulting to "it-to-de".`
      );
      setTranslationDirectionInternal("it-to-de");
    }
  };

  return { translationDirection, setTranslationDirection };
}
