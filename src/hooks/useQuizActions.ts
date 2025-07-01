import { checkAnswer } from "../utils/checkAnswer";
import { Verb } from "../types";

interface UseQuizActionsParams {
  cards: Verb[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  currentCard: Verb | undefined;
  input: string;
  setInput: (val: string) => void;
  setLocked: (val: boolean) => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  addMistake: (card: Verb) => void;
  clearMistakes: () => void;
  goToNext: () => void;
}

export function useQuizActions({
  setIndex,
  currentCard,
  input,
  setInput,
  setLocked,
  setScore,
  addMistake,
  clearMistakes,
  goToNext,
}: UseQuizActionsParams) {
  const reviewMistakes = () => {
    setIndex(0);
    setScore(0);
    setInput("");
    setLocked(false);
    clearMistakes();
  };

  const handleSubmit = (
    e: React.FormEvent,
    setFeedback: (msg: string | null) => void,
    mixedReverse: boolean
  ) => {
    e.preventDefault();
    if (!currentCard || input.trim() === "") return;

    const { isCorrect, expected } = checkAnswer(
      input,
      currentCard,
      mixedReverse
    );

    setLocked(true);

    if (isCorrect) {
      setFeedback("✅ Corretto!");
      setScore((prev) => prev + 1);
      setTimeout(() => {
        goToNext();
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback(`❌ Sbagliato. Era "${expected}"`);
      addMistake(currentCard);
      setTimeout(() => {
        setFeedback(null);
        setInput("");
        setLocked(false);
      }, 1000);
    }
  };

  return { reviewMistakes, handleSubmit };
}
