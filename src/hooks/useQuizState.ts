import { useQuizData } from "./useQuizData";
import { useQuizActions } from "./useQuizActions";
import { useState } from "react";
import { Verb } from "../types";
import { useQuizScore } from "./useQuizScore";

export function useQuizState(
  selectedCategory: string,
  restrictToCategory: boolean,
  onlyFavorites: boolean,
  favorites: number[]
) {
  const { cards, index, setIndex, currentCard } = useQuizData(
    selectedCategory,
    restrictToCategory,
    onlyFavorites,
    favorites
  );

  const [input, setInput] = useState("");
  const { score, setScore, resetScore } = useQuizScore();
  const [locked, setLocked] = useState(false);
  const [mistakes, setMistakes] = useState<Verb[]>([]);

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setInput("");
    setLocked(false);
  };

  const { reviewMistakes, handleSubmit } = useQuizActions({
    cards,
    setIndex,
    currentCard,
    input,
    setInput,
    setLocked,
    setScore,
    setMistakes,
    goToNext,
  });

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
