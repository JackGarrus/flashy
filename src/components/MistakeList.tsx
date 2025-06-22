import { Verb } from "../types";
import "./MistakeList.css";

/**
 * MistakeList displays a list of verbs the user got wrong during the quiz.
 * If at least one mistake exists, the list is shown along with a button to repeat them.
 *
 * Props:
 * - mistakes: array of Verb objects marked as incorrect
 * - onRepeat: function to restart the quiz using only mistakes
 */

interface MistakeListProps {
  mistakes: Verb[];
  onRepeat: () => void;
}

const MistakeList: React.FC<MistakeListProps> = ({ mistakes, onRepeat }) => {
  if (mistakes.length === 0) return null;

  return (
    <section className="mistake-list">
      <h4>Verbi da ripassare:</h4>
      <ul>
        {mistakes.map((m) => (
          <li key={m.id}>
            {m.verb} – {m.translation}
          </li>
        ))}
      </ul>
      <button className="btn" onClick={onRepeat}>
        Ripeti questi
      </button>
    </section>
  );
};

export default MistakeList;
