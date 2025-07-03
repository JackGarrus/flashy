import { useFlashcardFilter } from "./useFlashcardFilter";
import { useFlashcardNavigator } from "./useFlashcardNavigator";
import { useQuizActions } from "./useQuizActions";
import { useQuizInput } from "./useQuizInput";
import { useQuizScore } from "./useQuizScore";
import { useQuizLock } from "./useQuizLock";
import { useMistakes } from "./useMistakes";

export function useQuizState(
  selectedCategory: string,
  restrictToCategory: boolean,
  showOnlyFavourites: boolean,
  favoriteIds: number[]
) {
  const { filteredCards } = useFlashcardFilter(
    selectedCategory,
    showOnlyFavourites ? favoriteIds : []
  );

  const { current, revealed, setRevealed, next, prev, hasCards, isFavorite } =
    useFlashcardNavigator(filteredCards, favoriteIds);

  const { input, setInput, resetInput } = useQuizInput();
  const { score, setScore, resetScore } = useQuizScore();
  const { locked, setLocked, lock, unlock } = useQuizLock();
  const { mistakes, addMistake, removeMistake, clearMistakes } = useMistakes();

  const goToNext = () => {
    next();
    resetInput();
    unlock();
  };

  const { reviewMistakes, handleSubmit } = useQuizActions({
    cards: filteredCards,
    setIndex: () => {},
    currentCard: current,
    input,
    setInput,
    setLocked,
    setScore,
    addMistake,
    clearMistakes,
    goToNext,
  });

  return {
    data: {
      cards: filteredCards,
      currentCard: current,
      revealed,
      isFavorite,
      hasCards,
    },
    input: { input, setInput, resetInput },
    score: { score, setScore, resetScore },
    lock: { locked, setLocked, lock, unlock },
    mistakes: { mistakes, addMistake, removeMistake, clearMistakes },
    filters: selectedCategory,
    favoriteIds,
    actions: { goToNext, handleSubmit, reviewMistakes, prev, setRevealed },
  };
}
