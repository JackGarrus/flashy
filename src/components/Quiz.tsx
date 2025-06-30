import { useState } from "react";
import { QuizProps } from "../types";
import QuestionForm from "./QuestionForm";
import MistakeList from "./MistakeList";
import QuizModeSelector from "./QuizModeSelector";
import { useQuizState } from "../hooks/useQuizState";
import "./Quiz.css";
import Card from "../reusableComponents/Card";
import ProgressBar from "../reusableComponents/ProgressBar";
import { getPrompt, getQuizDirection } from "../utils/quizMode";
import { useQuizMode } from "../hooks/useQuizMode";

/**
 * Quiz component that renders a verb translation quiz based on the selected filters.
 * Supports multiple quiz modes (IT→DE, DE→IT, Mixed).
 * Uses useQuizState to handle quiz logic, scoring, mistakes, and progression.
 *
 * Children:
 * - QuizModeSelector: dropdown to switch translation direction.
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
  const { mode, setMode } = useQuizMode();

  if (cards.length === 0 || !currentCard)
    return <p>Nessuna domanda disponibile.</p>;

  const { mixedReverse } = getQuizDirection(mode, index);
  const prompt = getPrompt(mode, index, currentCard);

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, input, setFeedback, setInput, mixedReverse);
  };

  return (
    <Card>
      <QuizModeSelector mode={mode} setMode={setMode} />

      <QuestionForm
        input={input}
        onChange={setInput}
        onSubmit={onSubmit}
        disabled={locked}
        isInputEmpty={input.trim() === ""}
        prompt={prompt}
        feedback={feedback}
        onNext={goToNext}
      />
      <ProgressBar score={score} total={cards.length} />

      <MistakeList mistakes={mistakes} onRepeat={reviewMistakes} />
    </Card>
  );
};

export default Quiz;
