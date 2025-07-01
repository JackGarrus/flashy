import { useMemo, useState, useEffect } from "react";
import verbs from "../data/verbs.json";

interface Verb {
  id: number;
  verb: string;
  translation: string;
  example: string;
  category: string;
}

/**
 * Filters flashcards based on category and favorites.
 * Returns the filtered list and a flag indicating if any cards are available.
 */
export const useFlashcardFilter = (
  selectedCategory: string,
  favorites: number[]
) => {
  const [cards, setCards] = useState<Verb[]>([]);

  useEffect(() => {
    setCards(verbs);
  }, []);

  const filteredCards = useMemo(() => {
    if (selectedCategory === "Tutte") return cards;
    if (selectedCategory === "Preferiti") {
      return cards.filter((card) => favorites.includes(card.id));
    }
    return cards.filter((card) => card.category === selectedCategory);
  }, [selectedCategory, favorites, cards]);

  return {
    filteredCards,
    hasCards: filteredCards.length > 0,
  };
};
