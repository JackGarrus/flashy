import { useState } from "react";
import { Verb } from "../types";

export function useMistakes() {
  const [mistakes, setMistakes] = useState<Verb[]>([]);

  const addMistake = (card: Verb) => {
    setMistakes((prev) =>
      prev.some((m) => m.id === card.id) ? prev : [...prev, card]
    );
  };

  const removeMistake = (cardId: number) => {
    setMistakes((prev) => prev.filter((m) => m.id !== cardId));
  };

  const clearMistakes = () => {
    setMistakes([]);
  };

  return {
    mistakes,
    addMistake,
    removeMistake,
    clearMistakes,
  };
}
