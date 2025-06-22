import { useState } from "react";

/**
 * useCategoryFilter manages the state related to verb filtering.
 * It handles:
 * - The selected category (e.g., "Tutte", "Mangiare", "Preferiti")
 * - Whether to restrict the quiz to the selected category
 * - Whether to show only favorite verbs
 *
 * Returns:
 * - categories: list of available categories
 * - selectedCategory / setSelectedCategory
 * - restrictToCategory / setRestrictToCategory
 * - onlyFavorites / setOnlyFavorites
 */

export const useCategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tutte");
  const [restrictToCategory, setRestrictToCategory] = useState<boolean>(false);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  const categories = [
    "Tutte",
    "Preferiti",
    "Mangiare",
    "Movimento",
    "Comunicazione",
    "Tempo libero",
    "Casa",
    "Lavoro",
    "Scuola",
  ];

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    restrictToCategory,
    setRestrictToCategory,
    onlyFavorites,
    setOnlyFavorites,
  };
};
