import React from "react";
import Card from "../reusableComponents/Card";

interface Props {
  verb: string;
  translation: string;
  example: string;
  revealed: boolean;
  onReveal: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const speak = (text: string, lang: string = "de-DE") => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
};

const Flashcard: React.FC<Props> = ({
  verb,
  translation,
  example,
  revealed,
  onReveal,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <Card>
      <h2>
        {verb}{" "}
        <button onClick={onToggleFavorite}>{isFavorite ? "⭐" : "☆"}</button>
      </h2>
      <button onClick={() => speak(verb)}>🔊 Pronuncia</button>
      {!revealed ? (
        <button onClick={onReveal} className="btn">
          Mostra significato
        </button>
      ) : (
        <div>
          <p>Traduzione: {translation}</p>
          <p>
            <em>{example}</em>
          </p>
        </div>
      )}
    </Card>
  );
};

export default Flashcard;
