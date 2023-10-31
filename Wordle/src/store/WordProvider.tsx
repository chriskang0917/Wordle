import React, { createContext, useEffect, useReducer } from "react";

export interface IWordContext {
  wordRecords: string[];
  answerWord: string;
  currentRowIndex: number;
}

interface Action {
  type: "add_letter" | "remove_letter";
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
  wordRecords: ["HELLO", "", "", "", "", ""],
  answerWord: "ALLOW",
  currentRowIndex: 1,
};

const WordContext = createContext<InitContext | IWordContext>(initialState);

const wordReducer = (state: IWordContext, action: Action) => {
  const currentWord = state.wordRecords[state.currentRowIndex];

  switch (action.type) {
    case "add_letter":
      if (currentWord.length < 5) {
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
  }

  return initialState;
};

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wordReducer, initialState);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        dispatch({ type: "add_letter", payload: e.key });
      } else if (e.key === "Backspace") {
        dispatch({ type: "remove_letter", payload: "" });
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <WordContext.Provider value={{ state, dispatch }}>
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;
