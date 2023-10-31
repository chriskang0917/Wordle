import React, { createContext, useReducer } from "react";

export interface IWordContext {
  wordRecords: string[];
  answerWord: string;
  currentRowIndex: number;
}

interface Action {}

export interface InitContext {
  state: IWordContext;
  dispatch?: React.Dispatch<Action>;
}

interface WordProviderProps {
  children: React.ReactNode;
}

const initialState: IWordContext = {
  wordRecords: ["HELLO", "HOW", "", "", "", ""],
  answerWord: "ALLOW",
  currentRowIndex: 1,
};

const WordContext = createContext<InitContext | IWordContext>(initialState);

const wordReducer = (state: IWordContext, action: Action) => {
  console.log("state", state);
  console.log("action", action);
  return initialState;
};

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wordReducer, initialState);

  return (
    <WordContext.Provider value={{ state, dispatch }}>
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;
