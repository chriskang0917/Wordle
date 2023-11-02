import { NextUIProvider } from "@nextui-org/react";

import Board from "./components/Board";
import Header from "./components/Header";
import { WordProvider } from "./store/WordProvider";

function App() {
  return (
    <WordProvider>
      <NextUIProvider>
        <Header />
        <Board />
      </NextUIProvider>
    </WordProvider>
  );
}

export default App;
