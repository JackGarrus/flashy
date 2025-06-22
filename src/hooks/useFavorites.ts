import { useEffect, useState } from "react";

/**
 * useFavorites manages the user's list of favorite flashcards.
 * It syncs with localStorage for persistence across sessions.
 *
 * Returns:
 * - favorites: array of IDs marked as favorites
 * - toggleFavorite: function to add or remove a card from favorites
 *
 * Note:
 * - Favorites are stored in localStorage under the key "favorites"
 * - The hook automatically loads and persists the state on change
 */

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return { favorites, toggleFavorite };
};
