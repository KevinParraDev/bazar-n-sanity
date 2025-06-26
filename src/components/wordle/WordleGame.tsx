import { useEffect, useState } from "react";
import { getRandomWord, evaluateGuess } from "../../utils/word-utils";
import { GameBoard } from "./GameBoard";
import { Keyboard } from "./Keyboard";
import { useEconomy } from "../../context/EconomyContext";
import "../../styles/wordle.css";
import gemImg from "../../assets/time_relic_crash.webp";

export default function WordleGame() {
  const [solution, setSolution] = useState(""); //La palabra correcta
  const [guesses, setGuesses] = useState<string[]>([]); //Evaluacion del intento
  const [evaluations, setEvaluations] = useState<("correct" | "present" | "absent")[][]>([]); //Estado del intento correcto, presente o ausente
  const [currentGuess, setCurrentGuess] = useState(""); //Intento actual
  const [gameOver, setGameOver] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(90); //temporizador
  const [showRules, setShowRules] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [letterStatuses, setLetterStatuses] = useState<Record<string, "correct" | "present" | "absent" | undefined>>({});//actualiza teclado virtual

  const { addCurrency, relicCount } = useEconomy();

  useEffect(() => {
    setSolution(getRandomWord());
  }, []);

  useEffect(() => {
    if (gameOver || !hasStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          setNotification("⏰ Se acabó el tiempo. Perdiste.");
          setTimeout(() => setNotification(null), 3000);
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

  const calcularReliquias = (intentos: number) => {
    switch (intentos) {
      case 1: return 10;
      case 2: return 5;
      case 3: return 4;
      case 4: return 3;
      case 5: return 2;
      case 6: return 1;
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

      const evaluation = evaluateGuess(currentGuess, solution); //evalua el intento
      const newGuesses = [...guesses, currentGuess];
      const newEvaluations = [...evaluations, evaluation]; //nueva evaluacion al nuevo intento

      const newLetterStatuses = { ...letterStatuses }; //actualiza las letras del teclado
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

        if (currentGuess === solution) { //si el intento actual es la misma palabra que la solucion
          const reliquiasGanadas = calcularReliquias(newGuesses.length);
          addCurrency("relic", reliquiasGanadas);
          setNotification(`🎉 ¡Ganaste! +${reliquiasGanadas} reliquias`);
          setTimeout(() => setNotification(null), 3000);
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
    fullGuesses.push(currentGuess); //guarda el intento actual si todos los intentos la longitud del arreglo es menor a 6
  }

  return (
    <div className="App wordle-root">
      {notification && (
        <div className="wordle-notification">
          {notification}
        </div>
      )}
      
      <div className="wordle-container">
        <div className="wordle-header">
          <h1 className="wordle-title">CRASH WORDLE</h1>
          <div className="wordle-stats">
            <div className="stat-item">
              <img src={gemImg} alt="Reliquias" className="stat-icon" />
              <span className="stat-value">{relicCount}</span>
            </div>
            <div className="stat-item timer">
              <span className="timer-icon">⏰</span>
              <span className="stat-value">{timeLeft}s</span>
            </div>
          </div>
        </div>

        <div className="wordle-content">
          <div className="game-section">
            <GameBoard guesses={fullGuesses} evaluations={evaluations} />
            <Keyboard onKeyPress={handleKeyInput} letterStatuses={letterStatuses} />
          </div>
          
          <div className="wordle-controls">
            <button 
              className="rules-button" 
              onClick={() => setShowRules(true)}
            >
              ℹ️ Reglas
            </button>
          </div>
        </div>
      </div>

      {alertMessage && (
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
