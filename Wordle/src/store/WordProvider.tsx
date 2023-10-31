import React, { createContext, useEffect, useReducer } from "react";

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
  answerWord: "ALLOW",
  currentRowIndex: 0,
  hasWin: false,
};

const WordContext = createContext<InitContext | IWordContext>(initialState);

const wordReducer = (state: IWordContext, action: Action) => {
  const currentWord = state.wordRecords[state.currentRowIndex] || "";
  const maxRow: number = 6;

  if (!state.hasWin && state.currentRowIndex < 6) {
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

      case "check_answer":
        if (state.currentRowIndex < maxRow && currentWord.length === 5) {
          if (state.answerWord === currentWord) {
            console.log("You win!");
            return {
              ...state,
              hasWin: true,
              currentRowIndex: state.currentRowIndex + 1,
            };
          }

          return { ...state, currentRowIndex: state.currentRowIndex + 1 };
        }

        return state;
    }
  }

  return { ...initialState, hasWin: false };
};

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wordReducer, initialState);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        dispatch({ type: "add_letter", payload: e.key });
      }

      if (e.key === "Backspace") {
        dispatch({ type: "remove_letter" });
      }

      if (e.key === "Enter") {
        dispatch({ type: "check_answer" });
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
