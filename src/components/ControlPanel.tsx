import React from "react";

/**
 * Reusable control panel component that displays:
 * - A dropdown to switch between flashcard and quiz modes
 * - A category selector
 * - Optionally, quiz-only filters (restrict to selected category and favorites)
 *
 * All state is passed down via props from the parent component.
 */

interface ControlPanelProps {
  mode: "flashcard" | "quiz";
  onModeChange: (mode: "flashcard" | "quiz") => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  restrictToCategory: boolean;
  onToggleRestrict: (value: boolean) => void;
  onlyFavorites: boolean;
  onToggleOnlyFavorites: (value: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mode,
  onModeChange,
  categories,
  selectedCategory,
  onCategoryChange,
  restrictToCategory,
  onToggleRestrict,
  onlyFavorites,
  onToggleOnlyFavorites,
}) => {
  return (
    <>
      <div className="section">
        <label className="select-label">
          Modalità:
          <select
            value={mode}
            onChange={(e) =>
              onModeChange(e.target.value as "flashcard" | "quiz")
            }
          >
            <option value="flashcard">Flashcard</option>
            <option value="quiz">Quiz</option>
          </select>
        </label>
      </div>

      <div className="section">
        <label className="select-label">
          Categoria:
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        {mode === "quiz" && (
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={restrictToCategory}
                onChange={(e) => onToggleRestrict(e.target.checked)}
              />{" "}
              Usa solo verbi di questa categoria
            </label>
            <label>
              <input
                type="checkbox"
                checked={onlyFavorites}
                onChange={(e) => onToggleOnlyFavorites(e.target.checked)}
              />{" "}
              Solo preferiti
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default ControlPanel;
