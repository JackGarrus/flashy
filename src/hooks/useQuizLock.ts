import { useState } from "react";

// Form blocked state

export function useQuizLock() {
  const [locked, setLocked] = useState(false);

  const lock = () => setLocked(true);
  const unlock = () => setLocked(false);

  return { locked, setLocked, lock, unlock };
}
