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
  favorites: number[],
  showOnlyFavourites?: boolean
) => {
  const [cards, setCards] = useState<Verb[]>([]);

  useEffect(() => {
    setCards(verbs);
  }, []);

  const filteredCards = useMemo(() => {
    let result = [...cards];

    if (showOnlyFavourites) {
      result = result.filter((card) => favorites.includes(card.id));
    }

    if (selectedCategory !== "Tutte" && selectedCategory !== "Preferiti") {
      result = result.filter((card) => card.category === selectedCategory);
    }

    if (selectedCategory === "Preferiti" && !showOnlyFavourites) {
      result = cards.filter((card) => favorites.includes(card.id));
    }

    return result;
  }, [selectedCategory, favorites, cards, showOnlyFavourites]);

  return {
    filteredCards,
    hasCards: filteredCards.length > 0,
  };
};
