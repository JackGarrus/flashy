import { useState } from "react";

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
