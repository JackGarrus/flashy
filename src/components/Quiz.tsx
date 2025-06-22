import React, { useState } from "react";
import { QuizProps } from "../types";
import QuestionForm from "./QuestionForm";
import MistakeList from "./MistakeList";
import QuizModeSelector from "./QuizModeSelector";
import { useQuizState } from "../hooks/useQuizState";
import "./Quiz.css";

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
  const [mode, setMode] = useState<"it-to-de" | "de-to-it" | "mixed">(
    "it-to-de"
  );

  const isReverse = mode === "de-to-it";
  const isMixed = mode === "mixed";
  const mixedReverse = isMixed ? index % 2 === 1 : isReverse;

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, input, setFeedback, setInput, mixedReverse);
  };

  const percentage =
    cards.length > 0 ? Math.round((score / cards.length) * 100) : 0;

  if (cards.length === 0 || !currentCard)
    return <p>Nessuna domanda disponibile.</p>;

  const prompt = mixedReverse
    ? `Cosa significa "${currentCard.verb}" in italiano?`
    : `Come si dice "${currentCard.translation}" in tedesco?`;

  return (
    <div className="card">
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

      <p>
        Punteggio: {score} / {cards.length} ({percentage}%)
      </p>

      <div className="score-bar">
        <div
          className="score-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <MistakeList mistakes={mistakes} onRepeat={reviewMistakes} />
    </div>
  );
};

export default Quiz;
