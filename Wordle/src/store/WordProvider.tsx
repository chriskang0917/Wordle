import React, { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { wordBank } from "../assets/wordBank";

export interface IWordContext {
  wordRecords: string[];
  answerWord: string;
  currentRowIndex: number;
  hasWin: boolean;
}

interface Action {
  type: "init_answer" | "add_letter" | "remove_letter" | "check_answer";
  payload?: string;
}

export interface InitContext {
  state: IWordContext;
  dispatch?: React.Dispatch<Action>;
}

interface WordProviderProps {
  children: React.ReactNode;
}

const initialState: IWordContext = {
  wordRecords: ["", "", "", "", "", ""],
  answerWord: "",
  currentRowIndex: 0,
  hasWin: false,
};

const WordContext = createContext<InitContext | IWordContext>(initialState);

const maxRow: number = 6;

const wordReducer = (state: IWordContext, action: Action) => {
  const currentWord = state.wordRecords[state.currentRowIndex] || "";
  const maxLetters: number = 5;

  if (!state.hasWin && state.currentRowIndex < maxRow) {
    switch (action.type) {
      case "init_answer":
        return { ...state, answerWord: action.payload || "" };

      case "add_letter":
        if (currentWord.length < maxLetters) {
          const updatedWordRecords = [...state.wordRecords];
          const concatLetter = currentWord + action.payload?.toUpperCase();

          updatedWordRecords[state.currentRowIndex] = concatLetter;
          return { ...state, wordRecords: updatedWordRecords };
        }
        return state;

      case "remove_letter":
        if (currentWord.length > 0) {
          const updatedWordRecords = [...state.wordRecords];
          const removedLastLetter = currentWord.slice(0, -1);

          updatedWordRecords[state.currentRowIndex] = removedLastLetter;
          return { ...state, wordRecords: updatedWordRecords };
        }
        return state;

      case "check_answer":
        const isCompleteWord = currentWord.length === 5;

        if (!isCompleteWord) return state;

        const isCorrectAnswer = state.answerWord === currentWord;
        const currentRowIndex = state.currentRowIndex + 1;

        return isCorrectAnswer
          ? { ...state, currentRowIndex, hasWin: true }
          : { ...state, currentRowIndex };
    }
  }
  return { ...initialState, hasWin: false };
};

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wordReducer, initialState);

  useEffect(() => {
    if (!state.hasWin || state.currentRowIndex === 0) {
      const randomSeed: number = Math.floor(Math.random() * wordBank.length);
      const randomWord: string = wordBank[randomSeed].toUpperCase();

      dispatch({ type: "init_answer", payload: randomWord });
      console.log("Answer: ", randomWord);
    }
  }, [state.hasWin]);

  useEffect(() => {
    const handleKeyUp = ({ key }: KeyboardEvent) => {
      const isAlphabet = /^[a-zA-Z]$/.test(key);

      if (isAlphabet) dispatch({ type: "add_letter", payload: key });
      if (key === "Backspace") dispatch({ type: "remove_letter" });
      if (key === "Enter") dispatch({ type: "check_answer" });
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const successMessage = "恭喜答對！";
    const failedMessage = `很可惜沒有答對，答案是 ${state.answerWord}`;

    if (state.hasWin) toast.success(successMessage);
    if (!state.hasWin && state.currentRowIndex === maxRow)
      toast.error(failedMessage);
  }, [state.hasWin, state.currentRowIndex]);

  return (
    <WordContext.Provider value={{ state, dispatch }}>
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;
