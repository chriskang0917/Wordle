import { createContext } from "react";

export interface IWordContext {
  wordRecords: string[];
  answerWord: string;
  currentRowIndex: number;
}

const WordContext = createContext<IWordContext>({
  wordRecords: [],
  answerWord: "",
  currentRowIndex: 0,
});

const initialState: IWordContext = {
  wordRecords: ["HELLO", "HOW", "", "", "", ""],
  answerWord: "ALLOW",
  currentRowIndex: 1,
};

interface WordProviderProps {
  children: React.ReactNode;
}

export const WordProvider = ({ children }: WordProviderProps) => {
  // const [wordRecords, setWordRecords] = useState<string[]>(FAKE_WORDS);
  // const [currentRow, setCurrentRow] = useState<number>(1);

  return (
    <WordContext.Provider value={initialState}>{children}</WordContext.Provider>
  );
};

export default WordContext;
