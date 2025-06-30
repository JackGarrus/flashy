import { useState } from "react";
import { QuizMode } from "../types";

export function useQuizMode(initialMode: QuizMode = "it-to-de") {
  const [mode, setMode] = useState<QuizMode>(initialMode);
  return { mode, setMode };
}
