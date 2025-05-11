import { Verb } from "../types";

export function filterVerbs(
  allVerbs: Verb[],
  selectedCategory: string,
  restrictToCategory: boolean,
  onlyFavorites: boolean,
  favorites: number[]
): Verb[] {
  let filtered = allVerbs;

  if (onlyFavorites) {
    filtered = filtered.filter((card) => favorites.includes(card.id));
  } else if (restrictToCategory && selectedCategory !== "Tutte") {
    filtered = filtered.filter((card) => card.category === selectedCategory);
  } else if (selectedCategory !== "Tutte") {
    filtered = filtered.filter((card) => card.category === selectedCategory);
  }

  return filtered;
}
