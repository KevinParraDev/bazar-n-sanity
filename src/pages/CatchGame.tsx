import { useState, useEffect, useRef } from 'react';
import '../CatchGame.css';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const PLAYER_SPEED = 3;
const OBJECT_SPEED = 3;
const PLAYER_WIDTH = 50;
const OBJECT_WIDTH = 40;

const CatchGame = () => {
    const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
    const [objectX, setObjectX] = useState(Math.random() * (GAME_WIDTH - OBJECT_WIDTH));
    const [objectY, setObjectY] = useState(0);
    const [score, setScore] = useState(0);
    const [facingRight, setFacingRight] = useState(true);

    const leftPressed = useRef(false);
    const rightPressed = useRef(false);
    const requestRef = useRef<number>(0);
    let isMoving = false;


    // Key handlers
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') leftPressed.current = true;
            if (e.key === 'ArrowRight') rightPressed.current = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') leftPressed.current = false;
            if (e.key === 'ArrowRight') rightPressed.current = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Game loop (jugador y objeto)
    useEffect(() => {
        const animate = () => {
            setPlayerX(prev => {
                let next = prev;
                if (leftPressed.current) {
                    next = Math.max(0, prev - PLAYER_SPEED);
                    if (facingRight) setFacingRight(false); // solo cambia si estaba mirando a la derecha
                }
                if (rightPressed.current) {
                    next = Math.min(GAME_WIDTH - PLAYER_WIDTH, prev + PLAYER_SPEED);
                    if (!facingRight) setFacingRight(true); // solo cambia si estaba mirando a la izquierda
                }
                return next;
            });

            setObjectY(prevY => {
                const nextY = prevY + OBJECT_SPEED;
                if (nextY >= GAME_HEIGHT - 60) {
                    // Comprobar colisión
                    if (Math.abs(objectX - playerX) < PLAYER_WIDTH) {
                        setScore(prev => prev + 1);
                    }
                    // Reiniciar objeto
                    setObjectX(Math.random() * (GAME_WIDTH - OBJECT_WIDTH));
                    return 0;
                }
                return nextY;
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [playerX, objectX]);

    return (
        <div className="game-container" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
            <div className={`${leftPressed.current || rightPressed.current ? 'player-run sprite-run' : 'player-idle sprite-idle'} ${facingRight ? '' : 'flipped'}`} style={{ left: playerX }} />
            <div className="object" style={{ top: objectY, left: objectX }} />
            <div className="score">Puntaje: {score}</div>
        </div>
    );
};

export default CatchGame;