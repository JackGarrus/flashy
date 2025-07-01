import { useState, useEffect } from "react";

interface Verb {
  id: number;
  verb: string;
  translation: string;
  example: string;
  category: string;
}

/**
 * Handles flashcard navigation logic (index, next, prev, reveal).
 * Requires a list of already-filtered cards.
 */
export const useFlashcardNavigator = (
  filteredCards: Verb[],
  favoriteIds: number[]
) => {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [filteredCards]);

  const current = filteredCards[index] || null;

  const next = () => {
    setIndex((prev) => (prev + 1) % filteredCards.length);
    setRevealed(false);
  };

  const prev = () => {
    setIndex(
      (prev) => (prev - 1 + filteredCards.length) % filteredCards.length
    );
    setRevealed(false);
  };

  return {
    current,
    revealed,
    setRevealed,
    next,
    prev,
    hasCards: filteredCards.length > 0,
    isFavorite: current ? favoriteIds.includes(current.id) : false,
  };
};
