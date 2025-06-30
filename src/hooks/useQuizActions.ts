import { useState } from "react";
import { Verb } from "../types";
import { checkAnswer } from "../utils/checkAnswer";

export function useQuizActions(
  cards: Verb[],
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  currentCard: Verb | undefined
) {
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [mistakes, setMistakes] = useState<Verb[]>([]);

  const goToNext = () => {
    setIndex((prev: number) => (prev + 1) % cards.length);
    setInput("");
    setLocked(false);
  };

  const reviewMistakes = () => {
    if (mistakes.length > 0) {
      setIndex(0);
      setScore(0);
      setInput("");
      setLocked(false);
      setMistakes([]);
    }
  };

  const handleSubmit = (
    e: React.FormEvent,
    input: string,
    setFeedback: (msg: string | null) => void,
    setInput: (val: string) => void,
    mixedReverse: boolean
  ) => {
    e.preventDefault();
    if (locked || input.trim() === "" || !currentCard) return;

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

  return {
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
    handleSubmit,
  };
}
