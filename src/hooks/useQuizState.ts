import { useQuizData } from "./useQuizData";
import { useQuizActions } from "./useQuizActions";

export function useQuizState(
  selectedCategory: string,
  restrictToCategory: boolean,
  onlyFavorites: boolean,
  favorites: number[]
) {
  const { cards, index, setIndex, currentCard } = useQuizData(
    selectedCategory,
    restrictToCategory,
    onlyFavorites,
    favorites
  );

  const {
    input,
    setInput,
    score,
    setScore,
    locked,
    setLocked,
    mistakes,
    setMistakes,
    goToNext,
    reviewMistakes,
    handleSubmit,
  } = useQuizActions(cards, setIndex, currentCard);

  return {
    cards,
    index,
    input,
    setInput,
    score,
    setScore,
    locked,
    setLocked,
    mistakes,
    setMistakes,
    goToNext,
    reviewMistakes,
    currentCard,
    handleSubmit,
  };
}
