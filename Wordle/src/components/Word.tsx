import Letter from "./Letter";

interface WordProps {
  word: string;
}

export default function Word({ word }: WordProps) {
  const splitWord: string[] = word.split("");

  return (
    <div>
      {splitWord.map((letter, index) => (
        <Letter key={index} letter={letter} />
      ))}
    </div>
  );
}
