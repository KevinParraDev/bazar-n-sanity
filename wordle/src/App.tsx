import React, { useEffect, useState } from "react";
import { getRandomWord, evaluateGuess } from "./utils/word-utils";
import { GameBoard } from "./components/GameBoard";
import "./index.css";
import { Keyboard } from "./components/Keyboard";

function App() {
  const [solution, setSolution] = useState(""); //solucion del dia
  const [guesses, setGuesses] = useState<string[]>([]); //palabras intentadas
  const [evaluations, setEvaluations] = useState<("correct" | "present" | "absent")[][]>([]); //palabra correcta, presente o ausente
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); //mensaje por si hay pocas letras

  useEffect(() => { //genera la palabra al inicio
    setSolution(getRandomWord());
  }, []);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2000); // Genera el mensaje de error y oculta después de 2 segundos
  };

  const handleKeyInput = (key: string) => {
    if (gameOver) return;

    if (key === "ENTER") { //si presiona enter revisa si tiene 5 letras la palabra
  if (currentGuess.length < 5) {
    showAlert("❌ La palabra debe tener 5 letras");
    return;
  }

  if (currentGuess.length > 5) {
    showAlert("❌ Demasiadas letras");
    return;
  }

      const evaluation = evaluateGuess(currentGuess, solution); //evalua la palabra escrita actualmente
      const newGuesses = [...guesses, currentGuess];
      const newEvaluations = [...evaluations, evaluation];

      setGuesses(newGuesses);
      setEvaluations(newEvaluations);
      setCurrentGuess("");

      if (currentGuess === solution || newGuesses.length >= 6) {
        setGameOver(true);
        setTimeout(() =>
          alert(
            currentGuess === solution
              ? "🎉 ¡Ganaste!"
              : `💀 Perdiste. La palabra era: ${solution}`
          ), 100);
      }
    } else if (key === "⌫") { //elimina la ultima letra escrita 
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
    fullGuesses.push(currentGuess); //si no se han completado todos los intentos agrega el intento a el arreglo
  }

  return (
    <div className="App">  
      <h1>CRASH Wordle</h1>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      <GameBoard guesses={fullGuesses} evaluations={evaluations} />
      <Keyboard onKeyPress={handleKeyInput} />
    </div>
  );
}

export default App;
