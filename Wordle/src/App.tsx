import Board from "./components/Board";
import Header from "./components/Header";
import { WordProvider } from "./store/wordProvider";

function App() {
  return (
    <WordProvider>
      <Header />
      <Board />
    </WordProvider>
  );
}

export default App;
