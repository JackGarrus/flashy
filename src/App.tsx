import React, { useState } from "react";
import FlashcardViewer from "./components/FlashcardViewer";
import Quiz from "./components/Quiz";
import "./index.css";

const App: React.FC = () => {
  const [mode, setMode] = useState<"flashcard" | "quiz">("flashcard");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tutte");
  const [restrictToCategory, setRestrictToCategory] = useState<boolean>(false);

  const uniqueCategories = ["Tutte", "Mangiare", "Movimento"]; // puoi generare dinamicamente in futuro

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
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        {mode === "quiz" && (
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="checkbox"
              checked={restrictToCategory}
              onChange={(e) => setRestrictToCategory(e.target.checked)}
            />{" "}
            Usa solo verbi di questa categoria
          </label>
        )}
      </div>

      {mode === "flashcard" ? (
        <FlashcardViewer />
      ) : (
        <Quiz
          selectedCategory={selectedCategory}
          restrictToCategory={restrictToCategory}
        />
      )}
    </div>
  );
};

export default App;
