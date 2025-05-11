import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import verbs from "../data/verbs.json";

interface Verb {
  id: number;
  verb: string;
  translation: string;
  example: string;
  category: string;
}

interface FlashcardViewerProps {
  selectedCategory: string;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({
  selectedCategory,
  favorites,
  onToggleFavorite,
}) => {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [cards, setCards] = useState<Verb[]>([]);

  useEffect(() => {
    setCards(verbs);
  }, []);

  const filteredCards =
    selectedCategory === "Tutte"
      ? cards
      : selectedCategory === "Preferiti"
      ? cards.filter((card) => favorites.includes(card.id))
      : cards.filter((card) => card.category === selectedCategory);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % filteredCards.length);
    setRevealed(false);
  };

  const handlePrev = () => {
    setIndex(
      (prev) => (prev - 1 + filteredCards.length) % filteredCards.length
    );
    setRevealed(false);
  };

  if (filteredCards.length === 0) return <p>Nessuna flashcard disponibile.</p>;

  const current = filteredCards[index];

  return (
    <div className="container">
      <Flashcard
        verb={current.verb}
        translation={current.translation}
        example={current.example}
        revealed={revealed}
        onReveal={() => setRevealed(true)}
        isFavorite={favorites.includes(current.id)}
        onToggleFavorite={() => onToggleFavorite(current.id)}
      />
      <div>
        <button onClick={handlePrev} className="btn">
          ←
        </button>
        <button onClick={handleNext} className="btn">
          →
        </button>
      </div>
    </div>
  );
};

export default FlashcardViewer;
