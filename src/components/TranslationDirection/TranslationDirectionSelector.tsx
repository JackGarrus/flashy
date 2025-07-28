import { useQuizTranslationDirection } from "../../hooks/useQuizTranslationDirection";
import { QuizTranslationDirection } from "../../types";
import "./TranslationDirectionSelector.css";

const MODES = [
  { value: "it-to-de", label: "IT → DE" },
  { value: "de-to-it", label: "DE → IT" },
  { value: "mixed", label: "Mista" },
] as const;

interface Props {
  onModeChange?: (direction: QuizTranslationDirection) => void;
}

const TranslationDirectionSelector: React.FC<Props> = ({ onModeChange }) => {
  const { translationDirection, setTranslationDirection } =
    useQuizTranslationDirection();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as QuizTranslationDirection;
    setTranslationDirection(selected);
    onModeChange?.(selected); // call parent if provided
  };

  return (
    <div className="quiz-mode-selector">
      <label>
        Modalità:&nbsp;
        <select value={translationDirection} onChange={handleChange}>
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

export default TranslationDirectionSelector;
