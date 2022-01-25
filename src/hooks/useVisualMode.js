import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (!replace) {
      setMode(mode);
      setHistory([...history, mode]);
    } else {
      history.pop();
      setMode(mode);
      setHistory([...history, mode]);
    }
  }
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back, history };
}
