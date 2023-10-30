import Word from "./Word";

const FAKE_WORDS: string[] = ["HELLO", "", "", "", "", ""];

export default function Board() {
  return (
    <div>
      {FAKE_WORDS.map((word, index) => (
        <Word key={index} word={word} />
      ))}
    </div>
  );
}
