import React from "react";
import "./ControlPanel.css";
import RadioButtonGroup from "../reusableComponents/RadioButtonGroup";
import CustomSelect from "../reusableComponents/CustomSelect";
import CheckboxGroup from "../reusableComponents/CheckboxGroup";

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
  showOnlyFavourites: boolean;
  onToggleshowOnlyFavourites: (value: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mode,
  onModeChange,
  categories,
  selectedCategory,
  onCategoryChange,
  restrictToCategory,
  onToggleRestrict,
  showOnlyFavourites,
  onToggleshowOnlyFavourites,
}) => {
  const MODE_OPTIONS = [
    { label: "Flashcard", value: "flashcard" },
    { label: "Quiz", value: "quiz" },
  ];

  const CHECKBOX_OPTIONS = [
    {
      label: "Usa solo verbi di questa categoria",
      value: "restrict",
      checked: restrictToCategory,
    },
    {
      label: "Solo preferiti",
      value: "favorites",
      checked: showOnlyFavourites,
    },
  ];

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (value === "restrict") onToggleRestrict(checked);
    if (value === "favorites") onToggleshowOnlyFavourites(checked);
  };

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
          <CheckboxGroup
            name="quiz-filters"
            options={CHECKBOX_OPTIONS}
            onChange={handleCheckboxChange}
            direction="vertical"
          />
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
