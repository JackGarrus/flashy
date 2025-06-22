import React from "react";
import "./QuizModeSelector.css";

/**
 * Dropdown component to select the quiz mode:
 * - IT → DE (Italian to German)
 * - DE → IT (German to Italian)
 * - Mixed (alternating each question)
 *
 * Receives current mode and setter from parent component.
 */

type Mode = "it-to-de" | "de-to-it" | "mixed";

interface QuizModeSelectorProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const MODES: { label: string; value: Mode }[] = [
  { value: "it-to-de", label: "IT → DE" },
  { value: "de-to-it", label: "DE → IT" },
  { value: "mixed", label: "Mista" },
];

const QuizModeSelector: React.FC<QuizModeSelectorProps> = ({
  mode,
  setMode,
}) => {
  return (
    <div className="quiz-mode-selector">
      <label>
        Modalità:&nbsp;
        <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          {MODES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default QuizModeSelector;
