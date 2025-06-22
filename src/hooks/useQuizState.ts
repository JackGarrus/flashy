import { useEffect, useState } from "react";
import verbs from "../data/verbs.json";
import { Verb } from "../types";
import { filterVerbs } from "../utils/filters";
import { checkAnswer } from "../utils/checkAnswer";

/**
 * useQuizState manages quiz progression, user input, score, and mistakes.
 * It also handles answer validation and feedback messaging.
 *
 * Parameters:
 * - selectedCategory: current category selected
 * - restrictToCategory: whether to limit quiz to that category
 * - onlyFavorites: whether to use only favorite verbs
 * - favorites: array of favorite verb IDs
 *
 * Returns:
 * - Quiz state (cards, index, score, input, mistakes, etc.)
 * - Logic helpers (goToNext, reviewMistakes, handleSubmit)
 */

export function useQuizState(
  selectedCategory: string,
  restrictToCategory: boolean,
  onlyFavorites: boolean,
  favorites: number[]
) {
  const [cards, setCards] = useState<Verb[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [mistakes, setMistakes] = useState<Verb[]>([]);

  useEffect(() => {
    const filtered = filterVerbs(
      verbs,
      selectedCategory,
      restrictToCategory,
      onlyFavorites,
      favorites
    );
    setCards(filtered);
    setIndex(0);
    setInput("");
    setScore(0);
    setLocked(false);
    setMistakes([]);
  }, [selectedCategory, restrictToCategory, onlyFavorites, favorites]);

  const currentCard = cards[index];

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setInput("");
    setLocked(false);
  };

  const reviewMistakes = () => {
    if (mistakes.length > 0) {
      setCards(mistakes);
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

  return {
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
    handleSubmit,
  };
}
