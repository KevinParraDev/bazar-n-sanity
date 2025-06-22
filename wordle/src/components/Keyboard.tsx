import React from "react";
import "./Keyboard.css";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
};

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  return (
    <div className="keyboard">
      {KEY_ROWS.map((row, i) => (
        <div key={i} className="key-row">
          {row.map((key) => (
            <button
              key={key}
              className="key"
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
