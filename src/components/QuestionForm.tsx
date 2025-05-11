import React from "react";

interface QuestionFormProps {
  input: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  isInputEmpty: boolean;
  prompt: string;
  feedback: string | null;
  onNext: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  input,
  onChange,
  onSubmit,
  disabled,
  isInputEmpty,
  prompt,
  feedback,
  onNext,
}) => {
  return (
    <>
      <p>📝 {prompt}</p>
      <form onSubmit={onSubmit} aria-label="quiz-form">
        <input
          type="text"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <button
          type="submit"
          className="btn"
          disabled={disabled || isInputEmpty}
        >
          Verifica
        </button>
      </form>
      {feedback && <p>{feedback}</p>}
      <button onClick={onNext} className="btn" disabled={disabled}>
        Prossima
      </button>
    </>
  );
};

export default QuestionForm;
