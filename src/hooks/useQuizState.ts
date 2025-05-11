import { useEffect, useState } from "react";
import verbs from "../data/verbs.json";
import { Verb } from "../types";
import { filterVerbs } from "../utils/filters";

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
  };
}
