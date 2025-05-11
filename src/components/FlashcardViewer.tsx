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

const FlashcardViewer: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [cards, setCards] = useState<Verb[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tutte");

  useEffect(() => {
    setCards(verbs);
  }, []);

  const filteredCards =
    selectedCategory === "Tutte"
      ? cards
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setIndex(0);
    setRevealed(false);
  };

  const uniqueCategories = [
    "Tutte",
    ...Array.from(new Set(cards.map((card) => card.category))),
  ];

  if (filteredCards.length === 0) return <p>Nessuna flashcard disponibile.</p>;

  const current = filteredCards[index];

  return (
    <div className="container">
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Categoria:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Flashcard
        verb={current.verb}
        translation={current.translation}
        example={current.example}
        revealed={revealed}
        onReveal={() => setRevealed(true)}
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
