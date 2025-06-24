import React from "react";
import "./ControlPanel.css";
import RadioButtonGroup from "../reusableComponents/RadioButtonGroup";
import CustomSelect from "../reusableComponents/CustomSelect";

/**
 * Reusable control panel component that displays:
 * - A radio button group to switch between flashcard and quiz modes
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
  const MODE_OPTIONS = [
    { label: "Flashcard", value: "flashcard" },
    { label: "Quiz", value: "quiz" },
  ];

  return (
    <div className="control-panel-container">
      <RadioButtonGroup
        name="mode"
        label="Modalità"
        options={MODE_OPTIONS}
        selected={mode}
        onChange={(val) => onModeChange(val as "flashcard" | "quiz")}
      />

      <div className="section">
        <CustomSelect
          name="category"
          label="Categoria"
          selected={selectedCategory}
          onChange={onCategoryChange}
          options={categories.map((cat) => ({
            label: cat,
            value: cat,
          }))}
        />

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
    </div>
  );
};

export default ControlPanel;
