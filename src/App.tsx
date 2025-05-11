import React, { useState } from "react";
import FlashcardViewer from "./components/FlashcardViewer";
import Quiz from "./components/Quiz";
import "./index.css";

const App: React.FC = () => {
  const [mode, setMode] = useState<"flashcard" | "quiz">("flashcard");

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
      {mode === "flashcard" ? <FlashcardViewer /> : <Quiz />}
    </div>
  );
};

export default App;
