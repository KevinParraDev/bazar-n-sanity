import React from "react";
import "./Tile.css";

type TileProps = {
  letter: string;
  status?: "correct" | "present" | "absent";
};

export const Tile: React.FC<TileProps> = ({ letter, status }) => {
  return <div className={`tile ${status ?? ""}`}>{letter}</div>;
};
