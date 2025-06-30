import { useState } from "react";

export function useQuizInput() {
  const [input, setInput] = useState("");
  const resetInput = () => setInput("");

  return { input, setInput, resetInput };
}
