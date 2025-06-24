import { useState, useEffect, useRef, useCallback } from 'react';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const BIRD_SIZE = 40;
const PIPE_WIDTH = 60;
const GROUND_HEIGHT = 100;
const BASE_GRAVITY = 1.1;
const JUMP_HEIGHT = 60;
const BASE_PIPE_GAP = 180;
const PIPE_GAP = 160; // Valor intermedio y fijo

function getRandomGapY(pipeGap: number) {
  const min = 50;
  const max = GAME_HEIGHT - GROUND_HEIGHT - pipeGap - 50;
  return Math.floor(Math.random() * (max - min)) + min;
}

type Pipe = { x: number; gapY: number; scored?: boolean };
type Relic = { x: number; y: number; collected: boolean };

export function useGameLogic() {
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [pipes, setPipes] = useState<Pipe[]>([
    { x: GAME_WIDTH, gapY: getRandomGapY(BASE_PIPE_GAP), scored: false }
  ]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [relics, setRelics] = useState<Relic[]>([]);
  const [relicsCollected, setRelicsCollected] = useState(0);
  const velocity = useRef(0);

  const pipeGap = PIPE_GAP;

  // Game loop
  useEffect(() => {
    if (isGameOver || !started) return;
    const interval = setInterval(() => {
      setBirdY(prev => {
        const next = prev + velocity.current;
        velocity.current += BASE_GRAVITY;
        return next;
      });

      setPipes(prevPipes => {
        let newPipes = prevPipes.map(pipe => ({ ...pipe, x: pipe.x - 4 }));

        // SCORE: Solo para el primer par de tuberías
        if (newPipes.length) {
          const firstPipe = newPipes[0];
          const birdCenter = 80 + BIRD_SIZE / 2;
          const pipeCenter = firstPipe.x + PIPE_WIDTH / 2;
          if (!firstPipe.scored && birdCenter >= pipeCenter) {
            setScore(s => s + 1);
            newPipes[0] = { ...firstPipe, scored: true };
          }
        }

        // Agregar nueva tubería si la anterior sale de pantalla
        if (newPipes.length && newPipes[0].x < -PIPE_WIDTH) {
          newPipes = [
            ...newPipes.slice(1),
            { x: GAME_WIDTH, gapY: getRandomGapY(pipeGap), scored: false }
          ];
        }

        return newPipes;
      });

      // Mueve las reliquias y elimina las que salen de pantalla
      setRelics(prev =>
        prev
          .map(r => ({ ...r, x: r.x - 4 }))
          .filter(r => r.x > -40 && !r.collected)
      );

      // Probabilidad baja de generar una reliquia (ajusta el valor para más/menos frecuencia)
      if (score > 6 && Math.random() < 0.002) { // Solo después de 6 puntos
        // Busca la tubería más cercana y genera la reliquia en el centro del hueco
        if (pipes.length) {
          const pipe = pipes[pipes.length - 1];
          setRelics(prev => [
            ...prev,
            {
              x: GAME_WIDTH,
              y: pipe.gapY + pipeGap / 2 - 20, // Centrada en el hueco
              collected: false,
            },
          ]);
        }
      }
    }, 24);

    return () => clearInterval(interval);
  }, [isGameOver, pipeGap, started, pipes, score]);

  // Collision detection
  useEffect(() => {
    if (!started) return;
    // Nueva condición: perder si sale por arriba o por abajo
    if (birdY < 0 || birdY + BIRD_SIZE > GAME_HEIGHT) setIsGameOver(true);
    pipes.forEach(pipe => {
      const birdLeft = 80;
      const birdRight = birdLeft + BIRD_SIZE;
      const pipeRight = pipe.x + PIPE_WIDTH;
      const pipeLeft = pipe.x;
      if (
        pipeLeft < birdRight &&
        pipeRight > birdLeft
      ) {
        if (
          birdY < pipe.gapY ||
          birdY + BIRD_SIZE > pipe.gapY + pipeGap
        ) {
          setIsGameOver(true);
        }
      }
    });
  }, [birdY, pipes, pipeGap, started]);

  // Colisión con reliquias
  useEffect(() => {
    if (!started) return;
    setRelics(prev =>
      prev.map(r => {
        if (
          !r.collected &&
          80 + BIRD_SIZE > r.x &&
          80 < r.x + 40 &&
          birdY + BIRD_SIZE > r.y &&
          birdY < r.y + 40
        ) {
          setRelicsCollected(c => c + 1);
          return { ...r, collected: true };
        }
        return r;
      })
    );
  }, [birdY, relics, started]);

  const jump = useCallback(() => {
    if (!started && !isGameOver) setStarted(true);
    if (isGameOver) return;
    velocity.current = -JUMP_HEIGHT / 4;
  }, [isGameOver, started]);

  const restart = useCallback(() => {
    setBirdY(GAME_HEIGHT / 2);
    setPipes([
      { x: GAME_WIDTH, gapY: getRandomGapY(BASE_PIPE_GAP), scored: false }
    ]);
    setScore(0);
    setIsGameOver(false);
    setStarted(false);
    setRelics([]);
    setRelicsCollected(0);
    velocity.current = 0;
  }, []);

  return { birdY, pipes, isGameOver, score, jump, restart, pipeGap, started, relics, relicsCollected };
}