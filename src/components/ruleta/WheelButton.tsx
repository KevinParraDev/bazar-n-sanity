import React from "react";
import "./WheelButton.css";

interface Props {
  onClick: () => void;
}

const WheelButton: React.FC<Props> = ({ onClick }) => (
  <button className="wheel-button" onClick={onClick}>
    <img src="/images/ruleta_icon.png" alt="Ruleta" />
  </button>
);

export default WheelButton;
