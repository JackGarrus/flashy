import { useState } from "react";
import QuestionForm from "./QuestionForm";
import MistakeList from "./Mistake/MistakeList";
import ProgressBar from "../UI/ProgressBar";
import { useQuizState } from "../hooks/useQuizState";
import {
  getReverseTranslationDirection,
  getTranslationDirection,
} from "./TranslationDirection/translationDirectionUtils";
import { useTranslationDirection } from "./TranslationDirection/useTranslationDirection";
import { QuizProps } from "../types";
import TranslationDirectionSelector from "./TranslationDirection/TranslationDirectionSelector";

// TODO: BUGS: Quiz è un po' rotto dopo il refactor.
/* -  se filtri per 'preferiti' ti compare 'Nessuna domanda disponibile.' anche
      se li hai aggiunti nella modalità flashcard)
    - la progress bar non si resetta ogni volta che cambi categoria
    - la prossima domanda non compare anche se la risposta è giusta
 */

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
    useTranslationDirection();

  if (cards.length === 0 || !currentCard) {
    return <p>Nessuna domanda disponibile.</p>;
  }

  const index = cards.findIndex((c) => c.id === currentCard.id);
  const { mixedReverse } = getTranslationDirection(translationDirection, index);
  const prompt = getReverseTranslationDirection(
    translationDirection,
    index,
    currentCard
  );

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, setFeedback, mixedReverse);
  };

  return (
    <>
      {/* TODO: move this to ControlPanel */}
      <TranslationDirectionSelector onModeChange={setTranslationDirection} />

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
    </>
  );
};

export default Quiz;
