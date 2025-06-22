import { useEffect, useState } from "react";
import verbs from "../data/verbs.json";

/**
 * Custom React hook for managing flashcard navigation and filtering logic.
 *
 * Accepts the selected category and list of favorite IDs as input,
 * filters the flashcards accordingly, and manages navigation state (index, reveal).
 *
 * Returns:
 * - current flashcard
 * - whether it's revealed
 * - helper functions to go to the next/previous flashcard
 * - a flag indicating if any cards are available
 * - a flag indicating if the current card is a favorite
 */

interface Verb {
  id: number;
  verb: string;
  translation: string;
  example: string;
  category: string;
}

export const useFlashcardNavigator = (
  selectedCategory: string,
  favorites: number[]
) => {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [cards, setCards] = useState<Verb[]>([]);

  useEffect(() => {
    setCards(verbs);
  }, []);

  const filteredCards =
    selectedCategory === "Tutte"
      ? cards
      : selectedCategory === "Preferiti"
        ? cards.filter((card) => favorites.includes(card.id))
        : cards.filter((card) => card.category === selectedCategory);

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
    isFavorite: current ? favorites.includes(current.id) : false,
  };
};
