import { useEffect, useState } from "react";
import { Verb } from "../types";
import verbs from "../data/verbs.json";
import { filterVerbs } from "../utils/filters";

export function useQuizData(
  selectedCategory: string,
  restrictToCategory: boolean,
  onlyFavorites: boolean,
  favorites: number[]
) {
  const [cards, setCards] = useState<Verb[]>([]);
  const [index, setIndex] = useState(0);

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
  }, [selectedCategory, restrictToCategory, onlyFavorites, favorites]);

  const currentCard = cards[index];

  return { cards, index, setIndex, currentCard };
}
