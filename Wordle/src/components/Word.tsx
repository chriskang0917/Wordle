import Letter from "./Letter";

interface WordProps {
  word: string;
}

export default function Word({ word }: WordProps) {
  const splitWord: string[] = word.split("");

  if (!word) {
    const emptyLetters: string[] = Array(5).fill("");
    return (
      <div className="gap grid grid-cols-5 gap-x-1">
        {emptyLetters.map((letter, index) => (
          <Letter key={index} letter={letter} />
        ))}
      </div>
    );
  }

  return (
    <div className="gap grid grid-cols-5 gap-x-1">
      {splitWord.map((letter, index) => (
        <Letter key={index} letter={letter} />
      ))}
    </div>
  );
}
