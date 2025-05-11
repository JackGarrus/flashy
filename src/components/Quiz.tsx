import React, { useState, useEffect } from "react";
import verbs from "../data/verbs.json";

interface Verb {
  id: number;
  verb: string;
  translation: string;
  example: string;
  category: string;
}

interface QuizProps {
  selectedCategory: string;
  restrictToCategory: boolean;
  onlyFavorites: boolean;
  favorites: number[];
}

const Quiz: React.FC<QuizProps> = ({
  selectedCategory,
  restrictToCategory,
  onlyFavorites,
  favorites,
}) => {
  const [cards, setCards] = useState<Verb[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const allCards: Verb[] = verbs;
    let filtered = allCards;
    if (onlyFavorites) {
      filtered = filtered.filter((card) => favorites.includes(card.id));
    } else if (restrictToCategory && selectedCategory !== "Tutte") {
      filtered = filtered.filter((card) => card.category === selectedCategory);
    }
    setCards(filtered);
    setIndex(0);
    setInput("");
    setFeedback(null);
  }, [selectedCategory, restrictToCategory, onlyFavorites, favorites]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === cards[index].verb.toLowerCase()) {
      setFeedback("✅ Corretto!");
    } else {
      setFeedback(`❌ Sbagliato. Era "${cards[index].verb}"`);
    }
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setInput("");
    setFeedback(null);
  };

  if (cards.length === 0) return <p>Nessuna domanda disponibile.</p>;

  return (
    <div className="card">
      <p>📝 Come si dice "{cards[index].translation}" in tedesco?</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn">
          Verifica
        </button>
      </form>
      {feedback && <p>{feedback}</p>}
      <button onClick={handleNext} className="btn">
        Prossima
      </button>
    </div>
  );
};

export default Quiz;
