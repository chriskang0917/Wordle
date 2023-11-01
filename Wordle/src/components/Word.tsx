import { LetterState } from "../utils/word-utils";
import Letter from "./Letter";

interface WordProps {
  word: string;
  states: LetterState[];
}

export default function Word({ word, states }: WordProps) {
  const splitWord: string[] = word.split("");
  const remainingLetter: string[] = Array(5 - splitWord.length).fill("");

  const fullWord: string[] = [...splitWord, ...remainingLetter];

  return (
    <div className="gap grid grid-cols-5 gap-x-1">
      {fullWord.map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          state={states[index]}
          order={index}
        />
      ))}
    </div>
  );
}
