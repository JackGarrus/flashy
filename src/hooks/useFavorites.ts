import { useEffect, useState } from "react";

/**
 * useFavorites manages:
 * - The list of favorite verb IDs (persisted in localStorage)
 * - A UI-level toggle to show only favorite verbs
 *
 * Returns:
 * - favoriteIds: number[]
 * - updateFavoriteIds(id): add/remove ID from favorites
 * - showOnlyFavourites: boolean
 * - setShowOnlyFavourites: toggle for filtering logic
 */

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const [showOnlyFavourites, setShowOnlyFavourites] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("favorites ids", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const updateFavoriteIds = (id: number) => {
    setFavoriteIds((prev) => {
      return prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
    });
  };

  return {
    favoriteIds,
    updateFavoriteIds,
    showOnlyFavourites,
    setShowOnlyFavourites,
  };
};
