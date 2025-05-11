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
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [mistakes, setMistakes] = useState<Verb[]>([]);
  const [reverseMode, setReverseMode] = useState(false);

  useEffect(() => {
    const allCards: Verb[] = verbs;
    let filtered = allCards;
    if (onlyFavorites) {
      filtered = filtered.filter((card) => favorites.includes(card.id));
    } else if (restrictToCategory && selectedCategory !== "Tutte") {
      filtered = filtered.filter((card) => card.category === selectedCategory);
    } else if (selectedCategory !== "Tutte") {
      filtered = filtered.filter((card) => card.category === selectedCategory);
    }
    setCards(filtered);
    setIndex(0);
    setInput("");
    setFeedback(null);
    setScore(0);
    setLocked(false);
    setMistakes([]);
  }, [selectedCategory, restrictToCategory, onlyFavorites, favorites]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked || input.trim() === "") return;
    const currentCard = cards[index];
    const expected = reverseMode
      ? currentCard.translation.toLowerCase()
      : currentCard.verb.toLowerCase();
    const isCorrect = input.trim().toLowerCase() === expected;
    setLocked(true);
    if (isCorrect) {
      setFeedback("✅ Corretto!");
      setScore((prev) => prev + 1);
      setMistakes((prev) => prev.filter((m) => m.id !== currentCard.id));
      setTimeout(() => {
        goToNext();
      }, 1000);
    } else {
      setFeedback(`❌ Sbagliato. Era "${expected}"`);
      setMistakes((prev) =>
        prev.some((m) => m.id === currentCard.id)
          ? prev
          : [...prev, currentCard]
      );
      setTimeout(() => {
        setFeedback(null);
        setInput("");
        setLocked(false);
      }, 1000);
    }
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setInput("");
    setFeedback(null);
    setLocked(false);
  };

  const reviewMistakes = () => {
    if (mistakes.length > 0) {
      setCards(mistakes);
      setIndex(0);
      setScore(0);
      setInput("");
      setFeedback(null);
      setLocked(false);
      setMistakes([]);
    }
  };

  const percentage =
    cards.length > 0 ? Math.round((score / cards.length) * 100) : 0;

  const reviewList =
    mistakes.length > 0 ? (
      <div style={{ marginTop: "1rem" }}>
        <h4>Verbi da ripassare:</h4>
        <ul>
          {mistakes.map((m, i) => (
            <li key={`${m.id}-${i}`}>
              {m.verb} – {m.translation}
            </li>
          ))}
        </ul>
        <button className="btn" onClick={reviewMistakes}>
          Ripeti questi
        </button>
      </div>
    ) : null;

  if (cards.length === 0) return <p>Nessuna domanda disponibile.</p>;

  const isInputEmpty = input.trim() === "";
  const current = cards[index];

  return (
    <div className="card">
      <label style={{ display: "block", marginBottom: "1rem" }}>
        <input
          type="checkbox"
          checked={reverseMode}
          onChange={() => setReverseMode(!reverseMode)}
        />{" "}
        Modalità inversa (DE → IT)
      </label>

      <p>
        📝{" "}
        {reverseMode
          ? `Cosa significa "${current.verb}" in italiano?`
          : `Come si dice "${current.translation}" in tedesco?`}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={locked}
        />
        <button type="submit" className="btn" disabled={locked || isInputEmpty}>
          Verifica
        </button>
      </form>

      {feedback && <p>{feedback}</p>}
      <button onClick={goToNext} className="btn" disabled={locked}>
        Prossima
      </button>
      <p>
        Punteggio: {score} / {cards.length} ({percentage}%)
      </p>
      {reviewList}
    </div>
  );
};

export default Quiz;
