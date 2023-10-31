import Word from "./Word";

const FAKE_WORDS: string[] = ["HELLO", "", "", "", "", ""];

export default function Board() {
  return (
    <main className="bg-board-background h-[100vh]">
      <section className="grid-rows-board mx-auto grid max-w-[350px] gap-y-1 pt-[80px]">
        {FAKE_WORDS.map((word, index) => (
          <Word key={index} word={word} />
        ))}
      </section>
    </main>
  );
}
