import { useState } from "react";
import QuestionForm from "./QuestionForm";
import MistakeList from "./Mistake/MistakeList";
import QuizTranslationDirectionSelector from "./QuizTranslationDirectionSelector";
import Card from "../reusableComponents/Card";
import ProgressBar from "../reusableComponents/ProgressBar";
import { useQuizState } from "../hooks/useQuizState";
import {
  getReverseTranslationDirection,
  getQuizDirection,
} from "../utils/quizTranslationDirection";
import { useQuizTranslationDirection } from "../hooks/useQuizTranslationDirection";
import { QuizProps } from "../types";

const Quiz = ({
  selectedCategory,
  restrictToCategory,
  showOnlyFavourites,
  favoriteIds,
}: QuizProps) => {
  const {
    data: { cards, currentCard, revealed },
    input: { input, setInput },
    score: { score },
    lock: { locked },
    mistakes: { mistakes },
    actions: { goToNext, reviewMistakes, handleSubmit },
  } = useQuizState(
    selectedCategory,
    restrictToCategory,
    showOnlyFavourites,
    favoriteIds
  );

  const [feedback, setFeedback] = useState<string | null>(null);
  const { translationDirection, setTranslationDirection } =
    useQuizTranslationDirection();

  if (cards.length === 0 || !currentCard) {
    return <p>Nessuna domanda disponibile.</p>;
  }

  const index = cards.findIndex((c) => c.id === currentCard.id);
  const { mixedReverse } = getQuizDirection(translationDirection, index);
  const prompt = getReverseTranslationDirection(
    translationDirection,
    index,
    currentCard
  );

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, setFeedback, mixedReverse);
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
