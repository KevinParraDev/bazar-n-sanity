import WordleGame from "../components/wordle/WordleGame";
import Navbar from "../components/Islands/Navbar";

export default function WordlePage() {
  return (
    <>
      <Navbar username="Crash" />
      <WordleGame />
    </>
  );
}
