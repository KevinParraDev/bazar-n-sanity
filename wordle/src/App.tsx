// src/App.tsx

import React, { useEffect, useState } from "react";
import { getRandomWord, evaluateGuess } from "./utils/word-utils";
import { GameBoard } from "./components/GameBoard";
import { Keyboard } from "./components/Keyboard";
import "./index.css";

function App() {
  const [solution, setSolution] = useState(""); //palabra seleccionada
  const [guesses, setGuesses] = useState<string[]>([]); //intento
  const [evaluations, setEvaluations] = useState<("correct" | "present" | "absent")[][]>([]); //marca como correcta, presente o ausente
  const [currentGuess, setCurrentGuess] = useState(""); //evalua el intento actual
  const [gameOver, setGameOver] = useState(false); //finaliza el juego
  const [alertMessage, setAlertMessage] = useState("");
  const [wumpa, setWumpa] = useState(0); // estado para frutas Wumpa

  useEffect(() => {
    setSolution(getRandomWord());
  }, []);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  // Calcula las frutas ganadas según intentos
  const calcularWumpa = (intentos: number) => {
    switch (intentos) {
      case 1: return 50;
      case 2: return 40;
      case 3: return 30;
      case 4: return 20;
      case 5: return 10;
      case 6: return 5;
      default: return 0;
    }
  };

  const handleKeyInput = (key: string) => {
    if (gameOver) return;

    if (key === "ENTER") { //para que sea valida la palabra al dar enter evalua la longitud
      if (currentGuess.length < 5) {
        showAlert("❌ La palabra debe tener 5 letras");
        return;
      }
      if (currentGuess.length > 5) {
        showAlert("❌ Demasiadas letras");
        return;
      }

      const evaluation = evaluateGuess(currentGuess, solution);
      const newGuesses = [...guesses, currentGuess];
      const newEvaluations = [...evaluations, evaluation];

      setGuesses(newGuesses);
      setEvaluations(newEvaluations);
      setCurrentGuess("");

      if (currentGuess === solution || newGuesses.length >= 6) {
        setGameOver(true);

        if (currentGuess === solution) {
          const wumpaGanadas = calcularWumpa(newGuesses.length);
          setWumpa(prev => prev + wumpaGanadas);
          setTimeout(() =>
            alert(`🎉 ¡Ganaste! Has ganado ${wumpaGanadas} frutas Wumpa 🍑`), 100);
        } else {
          setTimeout(() =>
            alert(`💀 Perdiste. La palabra era: ${solution}`), 100);
        }
      }
    } else if (key === "⌫") { //para el teclado virtual, borra la ultima letra
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyInput(e.key.toUpperCase());
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [currentGuess, guesses, evaluations, gameOver]);

  const fullGuesses = [...guesses];
  if (fullGuesses.length < 6) {
    fullGuesses.push(currentGuess);
  }

  return (
    <div className="App">
      <h1>CRASH Wordle</h1>
      <h2>🍑 Frutas Wumpa: {wumpa}</h2>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      <GameBoard guesses={fullGuesses} evaluations={evaluations} />
      <Keyboard onKeyPress={handleKeyInput} />
    </div>
  );
}

export default App;
