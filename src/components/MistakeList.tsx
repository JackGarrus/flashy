// src/components/MistakeList.tsx
import React from "react";
import { Verb } from "../types";

interface MistakeListProps {
  mistakes: Verb[];
  onRepeat: () => void;
}

const MistakeList: React.FC<MistakeListProps> = ({ mistakes, onRepeat }) => {
  if (mistakes.length === 0) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>Verbi da ripassare:</h4>
      <ul>
        {mistakes.map((m, i) => (
          <li key={`${m.id}-${i}`}>
            {m.verb} – {m.translation}
          </li>
        ))}
      </ul>
      <button className="btn" onClick={onRepeat}>
        Ripeti questi
      </button>
    </div>
  );
};

export default MistakeList;
