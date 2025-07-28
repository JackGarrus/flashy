import Flashcard from "./Flashcard";
import { useFlashcardFilter } from "../../hooks/useFlashcardFilter";
import { useFlashcardNavigator } from "../../hooks/useFlashcardNavigator";

/**
 * FlashcardList displays flashcards one at a time based on the selected category.
 * It receives the current category and list of favorite IDs as props,
 * and uses custom hooks to manage filtered cards, navigation, and reveal state.
 * The component also supports marking/unmarking the current flashcard as favorite.
 */

interface FlashcardListProps {
  selectedCategory: string;
  favorites: number[];
  updateFavoritesIds: (id: number) => void;
}

const FlashcardList: React.FC<FlashcardListProps> = ({
  selectedCategory,
  favorites,
  updateFavoritesIds,
}) => {
  const { filteredCards, hasCards } = useFlashcardFilter(
    selectedCategory,
    favorites
  );

  const { current, revealed, setRevealed, next, prev, isFavorite } =
    useFlashcardNavigator(filteredCards, favorites);

  if (!hasCards) return <p>Nessuna flashcard disponibile.</p>;
  if (!current) return null;

  return (
    <>
      <Flashcard
        verb={current.verb}
        translation={current.translation}
        example={current.example}
        revealed={revealed}
        onReveal={() => setRevealed(true)}
        isFavorite={isFavorite}
        updateFavoritesIds={() => updateFavoritesIds(current.id)}
      />
      <div>
        <button onClick={prev} className="btn">
          ←
        </button>
        <button onClick={next} className="btn">
          →
        </button>
      </div>
    </>
  );
};

export default FlashcardList;
