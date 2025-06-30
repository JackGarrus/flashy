import { useState } from "react";
import { QuizProps } from "../types";
import QuestionForm from "./QuestionForm";
import MistakeList from "./MistakeList";
import QuizTranslationDirectionSelector from "./QuizTranslationDirectionSelector";
import { useQuizState } from "../hooks/useQuizState";
import Card from "../reusableComponents/Card";
import ProgressBar from "../reusableComponents/ProgressBar";
import {
  getReverseTranslationDirection,
  getQuizDirection,
} from "../utils/quizMode";
import { useQuizTranslationDirection } from "../hooks/useQuizTranslationDirection";

/**
 * Quiz component that renders a verb translation quiz based on the selected filters.
 * Supports multiple quiz modes (IT→DE, DE→IT, Mixed).
 * Uses useQuizState to handle quiz logic, scoring, mistakes, and progression.
 *
 * Children:
 * - QuizTranslationDirectionSelector: dropdown to switch translation direction.
 * - QuestionForm: displays a question and input form.
 * - MistakeList: allows repeating mistakes at the end.
 */

const Quiz: React.FC<QuizProps> = ({
  selectedCategory,
  restrictToCategory,
  onlyFavorites,
  favorites,
}) => {
  const {
    cards,
    index,
    input,
    setInput,
    score,
    locked,
    mistakes,
    goToNext,
    reviewMistakes,
    currentCard,
    handleSubmit,
  } = useQuizState(
    selectedCategory,
    restrictToCategory,
    onlyFavorites,
    favorites
  );

  const [feedback, setFeedback] = useState<string | null>(null);
  const { translationDirection, setTranslationDirection } =
    useQuizTranslationDirection();

  if (cards.length === 0 || !currentCard)
    return <p>Nessuna domanda disponibile.</p>;

  const { mixedReverse } = getQuizDirection(translationDirection, index);
  const prompt = getReverseTranslationDirection(
    translationDirection,
    index,
    currentCard
  );

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, input, setFeedback, setInput, mixedReverse);
  };

  return (
    <Card>
      <QuizTranslationDirectionSelector
        onModeChange={setTranslationDirection}
      />

      <QuestionForm
        input={input}
        onChange={setInput}
        onSubmit={onSubmit}
        disabled={locked}
        isInputEmpty={input.trim() === ""}
        translationDirection={prompt}
        feedback={feedback}
        onNext={goToNext}
      />

      <ProgressBar score={score} total={cards.length} />
      <MistakeList mistakes={mistakes} onRepeat={reviewMistakes} />
    </Card>
  );
};

export default Quiz;
