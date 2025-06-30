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
  onlyFavorites: boolean;
  favorites: number[];
}

export type QuizTranslationDirection = "it-to-de" | "de-to-it" | "mixed";
