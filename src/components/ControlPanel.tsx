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
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mode,
  onModeChange,
  categories,
  selectedCategory,
  onCategoryChange,
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
      </div>
    </div>
  );
};

export default ControlPanel;
