// src/components/QuizModeSelector.tsx
import React from "react";

type Mode = "it-to-de" | "de-to-it" | "mixed";

interface QuizModeSelectorProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const QuizModeSelector: React.FC<QuizModeSelectorProps> = ({
  mode,
  setMode,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Modalità:&nbsp;
        <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          <option value="it-to-de">IT → DE</option>
          <option value="de-to-it">DE → IT</option>
          <option value="mixed">Mista</option>
        </select>
      </label>
    </div>
  );
};

export default QuizModeSelector;
