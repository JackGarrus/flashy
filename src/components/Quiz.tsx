import React, { useState } from "react";
import { QuizProps } from "../types";
import QuestionForm from "./QuestionForm";
import MistakeList from "./MistakeList";
import QuizModeSelector from "./QuizModeSelector";
import { checkAnswer } from "../utils/checkAnswer";
import { useQuizState } from "../hooks/useQuizState";

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
    setScore,
    locked,
    setLocked,
    mistakes,
    setMistakes,
    goToNext,
    reviewMistakes,
    currentCard,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (locked || input.trim() === "") return;
    const { isCorrect, expected } = checkAnswer(
      input,
      currentCard,
      mixedReverse
    );

    setLocked(true);

    if (isCorrect) {
      setFeedback("✅ Corretto!");
      setScore((prev) => prev + 1);
      setMistakes((prev) => prev.filter((m) => m.id !== currentCard.id));
      setTimeout(() => {
        goToNext();
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback(`❌ Sbagliato. Era "${expected}"`);
      setMistakes((prev) =>
        prev.some((m) => m.id === currentCard.id)
          ? prev
          : [...prev, currentCard]
      );
      setTimeout(() => {
        setFeedback(null);
        setInput("");
        setLocked(false);
      }, 1000);
    }
  };

  const percentage =
    cards.length > 0 ? Math.round((score / cards.length) * 100) : 0;

  if (cards.length === 0) return <p>Nessuna domanda disponibile.</p>;

  return (
    <div className="card">
      <QuizModeSelector mode={mode} setMode={setMode} />

      <QuestionForm
        input={input}
        onChange={(val) => setInput(val)}
        onSubmit={handleSubmit}
        disabled={locked}
        isInputEmpty={input.trim() === ""}
        prompt={
          mixedReverse
            ? `Cosa significa "${currentCard.verb}" in italiano?`
            : `Come si dice "${currentCard.translation}" in tedesco?`
        }
        feedback={feedback}
        onNext={goToNext}
      />

      <p>
        Punteggio: {score} / {cards.length} ({percentage}%)
      </p>
      <MistakeList mistakes={mistakes} onRepeat={reviewMistakes} />
    </div>
  );
};

export default Quiz;
