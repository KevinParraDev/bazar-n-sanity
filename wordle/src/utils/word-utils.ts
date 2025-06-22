const WORDS = ["crash", "nitro", "polar", "wumpa", "bonus", "cajas", "karts", "gemas", "cortex", "geary", "chick", "krunk", "oxide" ];

export function getRandomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
}

export function evaluateGuess(guess: string, solution: string): ("correct" | "present" | "absent")[] {
  const result: ("correct" | "present" | "absent")[] = Array(5).fill("absent");
  const solutionChars = solution.split("");
  const guessChars = guess.split("");

  // palabras correctas
  guessChars.forEach((char, i) => {
    if (char === solutionChars[i]) {
      result[i] = "correct";
      solutionChars[i] = ""; // marca como usada
      guessChars[i] = "";
    }
  });

  // letras presentes pero en posicion incorrecta
  guessChars.forEach((char, i) => {
    if (char && solutionChars.includes(char)) {
      result[i] = "present";
      solutionChars[solutionChars.indexOf(char)] = ""; // Marca como usada
    }
  });

  return result;
}
