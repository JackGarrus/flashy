export interface Verb {
  id: number;
  verb: string;
  translation: string;
  example: string;
  category: string;
}

export interface QuizProps {
  selectedCategory: string;
  restrictToCategory: boolean;
  showOnlyFavourites: boolean;
  favoriteIds: number[];
}

export type TranslationDirection = "it-to-de" | "de-to-it" | "mixed";
