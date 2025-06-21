import React, { useState } from "react";
import FlashcardViewer from "./components/FlashcardViewer";
import Quiz from "./components/Quiz";
import { useFavorites } from "./hooks/useFavorites";
import { useCategoryFilter } from "./hooks/useCategoryFilter";
import "./index.css";

const App: React.FC = () => {
  const [mode, setMode] = useState<"flashcard" | "quiz">("flashcard");
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    restrictToCategory,
    setRestrictToCategory,
    onlyFavorites,
    setOnlyFavorites,
  } = useCategoryFilter();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="container">
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Modalità:
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "flashcard" | "quiz")}
          >
            <option value="flashcard">Flashcard</option>
            <option value="quiz">Quiz</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Categoria:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        {mode === "quiz" && (
          <div>
            <label style={{ marginLeft: "1rem" }}>
              <input
                type="checkbox"
                checked={restrictToCategory}
                onChange={(e) => setRestrictToCategory(e.target.checked)}
              />{" "}
              Usa solo verbi di questa categoria
            </label>
            <label style={{ marginLeft: "1rem" }}>
              <input
                type="checkbox"
                checked={onlyFavorites}
                onChange={(e) => setOnlyFavorites(e.target.checked)}
              />{" "}
              Solo preferiti
            </label>
          </div>
        )}
      </div>

      {mode === "flashcard" ? (
        <FlashcardViewer
          selectedCategory={selectedCategory}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <Quiz
          selectedCategory={selectedCategory}
          restrictToCategory={restrictToCategory}
          onlyFavorites={onlyFavorites}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export default App;
