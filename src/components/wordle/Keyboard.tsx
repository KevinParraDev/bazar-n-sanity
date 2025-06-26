import React from "react";
import "../../styles/wordle.css";
type KeyboardProps = {
  onKeyPress: (key: string) => void;
  letterStatuses: Record<string, "correct" | "present" | "absent" | undefined>;
};

const rows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, letterStatuses }) => {
  const getKeyClass = (key: string) => {
    const status = letterStatuses[key];
    if (status === "correct") return "key correct";
    if (status === "present") return "key present";
    if (status === "absent") return "key absent";
    return "key";
  };

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
