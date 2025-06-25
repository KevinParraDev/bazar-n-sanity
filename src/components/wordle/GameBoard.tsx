  import React from "react";
import { Tile } from "./Tile";

type Props = {
  guesses: string[];
  evaluations: ("correct" | "present" | "absent")[][];
};

export const GameBoard: React.FC<Props> = ({ guesses, evaluations }) => {
  const rows = Array.from({ length: 6 }, (_, i) => { //hay 6 filas
    const guess = guesses[i] || ""; //toma la palabra escrita
    const evalRow = evaluations[i] || []; //su evaluacion
    return (
      <div key={i} className="row">
        {Array.from({ length: 5 }, (_, j) => (
          <Tile
            key={j}
            letter={guess[j] || ""} //crea casillas para cada letra
            status={evalRow[j]}//evalua el color de la letra
          />
        ))}
      </div>
    );
  });

  return <div className="board">{rows}</div>;
};
