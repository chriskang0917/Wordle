import React, { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

export interface IWordContext {
  wordRecords: string[];
  answerWord: string;
  currentRowIndex: number;
  hasWin: boolean;
}

interface Action {
  type: "add_letter" | "remove_letter" | "check_answer";
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
  answerWord: "TRAIL",
  currentRowIndex: 0,
  hasWin: false,
};

const WordContext = createContext<InitContext | IWordContext>(initialState);

const wordReducer = (state: IWordContext, action: Action) => {
  const currentWord = state.wordRecords[state.currentRowIndex] || "";
  const maxRow: number = 6;
  const maxLetters: number = 5;

  if (!state.hasWin && state.currentRowIndex < maxRow) {
    switch (action.type) {
      case "add_letter":
        if (currentWord.length < maxLetters) {
          const updatedWordRecords = [...state.wordRecords];
          updatedWordRecords[state.currentRowIndex] =
            currentWord + action.payload?.toUpperCase();
          return { ...state, wordRecords: updatedWordRecords };
        }
        return state;

      case "remove_letter":
        if (currentWord.length > 0) {
          const updatedWordRecords = [...state.wordRecords];
          updatedWordRecords[state.currentRowIndex] = currentWord.slice(0, -1);
          return { ...state, wordRecords: updatedWordRecords };
        }
        return state;

      case "check_answer":
        const isCompleteWord = currentWord.length === 5;
        const isCorrectAnswer = state.answerWord === currentWord;

        if (isCompleteWord && isCorrectAnswer) {
          return {
            ...state,
            hasWin: true,
            currentRowIndex: state.currentRowIndex + 1,
          };
        }
        if (isCompleteWord && !isCorrectAnswer) {
          return {
            ...state,
            currentRowIndex: state.currentRowIndex + 1,
          };
        }
        return state;
    }
  }
  return { ...initialState, hasWin: false };
};

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wordReducer, initialState);

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

  const successMessage = "恭喜答對！";
  const failedMessage = `很可惜沒有答對，答案是 ${state.answerWord}`;

  useEffect(() => {
    if (state.hasWin) toast.success(successMessage);
    if (!state.hasWin && state.currentRowIndex === 6)
      toast.error(failedMessage);
  }, [state.hasWin, state.currentRowIndex]);

  return (
    <WordContext.Provider value={{ state, dispatch }}>
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;
