import { LetterState, computeGuess } from "../utils/word-utils";
import Word from "./Word";

const FAKE_WORDS: string[] = ["HELLO", "", "", "", "", ""];
const ANSWER_WORD: string = "ALLOW";

export default function Board() {
  // const [wordRecords, setWordRecords] = useState<string[]>(FAKE_WORDS);
  // const [currentRow, setCurrentRow] = useState<number>(1);

  // JUST FOR TYPESCRIPT COMPILING PURPOSES
  const wordRecords: string[] = FAKE_WORDS;
  const currentRowIndex: number = 1;

  const getGuessStates = (rowIndex: number, currentRowIndex: number) => {
    const guessWord: string = wordRecords[rowIndex];

    if (rowIndex < currentRowIndex) {
      return computeGuess(ANSWER_WORD, guessWord);
    }

    if (rowIndex === currentRowIndex) {
      const wordLength: number = guessWord.length;
      const editedState = Array(wordLength).fill(LetterState.Edit);
      const remainState = Array(5 - wordLength).fill(LetterState.Empty);
      const fullWordState: LetterState[] = [...editedState, ...remainState];

      return fullWordState;
    }

    return Array(5).fill(LetterState.Empty);
  };

  return (
    <main className="bg-board-background h-[100vh]">
      <section className="grid-rows-board mx-auto grid max-w-[350px] gap-y-1 pt-[80px]">
        {wordRecords.map((word: string, rowIndex: number) => (
          <Word
            key={rowIndex}
            word={word}
            states={getGuessStates(rowIndex, currentRowIndex)}
          />
        ))}
      </section>
    </main>
  );
}
