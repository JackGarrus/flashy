import { useQuizData } from "./useQuizData";
import { useQuizActions } from "./useQuizActions";
import { useQuizInput } from "./useQuizInput";
import { useQuizScore } from "./useQuizScore";
import { useQuizLock } from "./useQuizLock";
import { useMistakes } from "./useMistakes";

export function useQuizState(
  selectedCategory: string,
  restrictToCategory: boolean,
  showOnlyFavourites: boolean,
  favorites: number[]
) {
  // Quiz cards and navigation
  const { cards, index, setIndex, currentCard } = useQuizData(
    selectedCategory,
    restrictToCategory,
    showOnlyFavourites,
    favorites
  );

  // Input state
  const { input, setInput, resetInput } = useQuizInput();

  // Score state
  const { score, setScore, resetScore } = useQuizScore();

  // Lock state (used to prevent interaction after submit)
  const { locked, setLocked, lock, unlock } = useQuizLock();

  // Mistake tracking
  const { mistakes, addMistake, removeMistake, clearMistakes } = useMistakes();

  // Advance to next card
  const goToNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    resetInput();
    unlock();
  };

  // Submit handler and review mode
  const { reviewMistakes, handleSubmit } = useQuizActions({
    cards,
    setIndex,
    currentCard,
    input,
    setInput,
    setLocked,
    setScore,
    addMistake,
    clearMistakes,
    goToNext,
  });

  return {
    data: { cards, currentCard, index },
    input: { input, setInput, resetInput },
    score: { score, setScore, resetScore },
    lock: { locked, setLocked, lock, unlock },
    mistakes: { mistakes, addMistake, removeMistake, clearMistakes },
    actions: { goToNext, handleSubmit, reviewMistakes },
  };
}
