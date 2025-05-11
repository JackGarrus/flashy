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

  useEffect(() => {
    setCards(verbs);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setRevealed(false);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setRevealed(false);
  };

  if (cards.length === 0) return <p>Caricamento...</p>;

  const current = cards[index];

  return (
    <div className="container">
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
