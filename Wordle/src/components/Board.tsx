import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import WordContext, { InitContext } from "../store/WordProvider";
import { LetterState, computeGuess } from "../utils/word-utils";
import Word from "./Word";

export default function Board() {
  const { state } = useContext(WordContext as React.Context<InitContext>);
  const { wordRecords, answerWord, currentRowIndex } = state;

  const getGuessStates = (rowIndex: number, currentRowIndex: number) => {
    const guessWord: string = wordRecords[rowIndex];

    if (rowIndex < currentRowIndex) {
      return computeGuess(answerWord, guessWord);
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
    <>
      <section className="mx-auto grid max-w-[350px] grid-rows-board gap-y-1 pt-[150px]">
        {wordRecords.map((word: string, rowIndex: number) => (
          <Word
            key={rowIndex}
            word={word}
            states={getGuessStates(rowIndex, currentRowIndex)}
          />
        ))}
      </section>
      <Toaster />
    </>
  );
}
