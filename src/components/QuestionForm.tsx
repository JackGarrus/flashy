import "./QuestionForm.css";

/**
 * QuestionForm displays the current quiz question and manages user input.
 * Handles submission, disables fields as needed, and provides visual feedback.
 *
 * Props:
 * - input: current text input value
 * - onChange: updates input state
 * - onSubmit: submits the answer form
 * - disabled: whether input/buttons should be disabled
 * - isInputEmpty: disables submit when input is blank
 * - prompt: current quiz question
 * - feedback: message shown after submission
 * - onNext: goes to the next question
 */

interface QuestionFormProps {
  input: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  isInputEmpty: boolean;
  translationDirection: string;
  feedback: string | null;
  onNext: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  input,
  onChange,
  onSubmit,
  disabled,
  isInputEmpty,
  translationDirection,
  feedback,
  onNext,
}) => {
  return (
    <div className="question-form">
      <p className="prompt">📝 {translationDirection}</p>
      <form onSubmit={onSubmit} aria-label="quiz-form">
        <input
          type="text"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-label="answer-input"
        />
        <button
          type="submit"
          className="btn"
          disabled={disabled || isInputEmpty}
        >
          Verifica
        </button>
      </form>
      {feedback && <p className="feedback">{feedback}</p>}
      <button onClick={onNext} className="btn next" disabled={disabled}>
        Prossima
      </button>
    </div>
  );
};

export default QuestionForm;
