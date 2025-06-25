import React, { useEffect, useState } from "react";
import { getRandomWord, evaluateGuess } from "./utils/word-utils";
import { GameBoard } from "./components/GameBoard";
import { Keyboard } from "./components/Keyboard";
import "./index.css";
import wumpaImg from './assets/images/time_relic_crash.webp';



function App() {
  const [solution, setSolution] = useState(""); //Solucion / Palabra elegida
  const [guesses, setGuesses] = useState<string[]>([]); //Intento del usuario
  const [evaluations, setEvaluations] = useState<("correct" | "present" | "absent")[][]>([]); //Evaluacion del intento
  const [currentGuess, setCurrentGuess] = useState(""); //Intento Actual
  const [gameOver, setGameOver] = useState(false); //Termina el juego
  const [alertMessage, setAlertMessage] = useState("");
  const [relic, setRelic] = useState(0); //Usestate para guardar la recompensa
  const [timeLeft, setTimeLeft] = useState(90); //Temporizador
  const [showRules, setShowRules] = useState(false); //Reglas
  const [hasStarted, setHasStarted] = useState(false); //Empezar apenas evalue la primera palabra
  const [letterStatuses, setLetterStatuses] = useState<Record<string, "correct" | "present" | "absent" | undefined>>({}); //Actualizacion del teclado virtual

  useEffect(() => {
    setSolution(getRandomWord());
  }, []);

  useEffect(() => {
    if (gameOver || !hasStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true); //Termina el juego
          alert("⏰ Se acabó el tiempo. Perdiste.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, hasStarted]);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const calcularRelic = (intentos: number) => { //Calculo de la reliquia
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

    if (key === "ENTER") {
      if (currentGuess.length < 5) {
        showAlert("❌ La palabra debe tener 5 letras");
        return;
      }
      if (currentGuess.length > 5) {
        showAlert("❌ Demasiadas letras");
        return;
      }

      if (!hasStarted) setHasStarted(true);

      const evaluation = evaluateGuess(currentGuess, solution); //evalua si la letra esta ausente, presente o correcta
      const newGuesses = [...guesses, currentGuess]; //intento
      const newEvaluations = [...evaluations, evaluation]; //anteriores evaluaciones

      // Actualizar teclas del teclado virtual
      const newLetterStatuses = { ...letterStatuses };
      currentGuess.split("").forEach((letter, i) => {
        const newStatus = evaluation[i];
        const currentStatus = newLetterStatuses[letter];

        if (
          currentStatus !== "correct" &&
          (currentStatus !== "present" || newStatus === "correct")
        ) {
          newLetterStatuses[letter] = newStatus;
        }
      });
      setLetterStatuses(newLetterStatuses);

      setGuesses(newGuesses);
      setEvaluations(newEvaluations);
      setCurrentGuess("");

      if (currentGuess === solution || newGuesses.length >= 6) {
        setGameOver(true);

        if (currentGuess === solution) {
          const relicGanadas = calcularRelic(newGuesses.length);
          setRelic(prev => prev + relicGanadas);
          setTimeout(() =>
            alert(`🎉 ¡Ganaste! Has ganado ${relicGanadas}  reliquias`), 100);
        }
      }
    } else if (key === "⌫") {
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
      <div className="layout">
        <div className="sidebar">
          <button onClick={() => setShowRules(true)}>ℹ️ Ver Reglas</button>
          <h2>
            <img src={wumpaImg} alt="Reliquia" className="wumpa-icon" />
            Reliquias: {relic}
          </h2>


          <h3>🕒 Tiempo restante: {timeLeft}</h3>
        </div>

        <div className="game-section">
          <h1 className="title">CRASH WORDLE</h1>
          <GameBoard guesses={fullGuesses} evaluations={evaluations} />
          <Keyboard onKeyPress={handleKeyInput} letterStatuses={letterStatuses} />
        </div>
      </div>

      {showAlert && alertMessage && (
        <div className="alert">{alertMessage}</div>
      )}

      {showRules && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Reglas del juego</h2>
            <ul>
              <li>Adivina la palabra en 6 intentos</li>
              <li>Las palabras son sobre algunos personajes</li>
              <li>🟩 Letra correcta y en la posición correcta</li>
              <li>🟨 Letra correcta pero en otra posición</li>
              <li>⬜ Letra incorrecta</li>
              <li>Premio: entre más rápido adivines, puedes conseguir reliquias</li>
              <li>TEN CUIDADO CON EL TIEMPO</li>
            </ul>
            <button onClick={() => setShowRules(false)}>Cerrar</button>
            <a
              href="https://youtu.be/zkBqOmelX28?si=muNWGhaov1LTzFZj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="video-button">NO ABRIR</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
