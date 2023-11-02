import { NextUIProvider } from "@nextui-org/react";
import Layout from "./components/Layout";
import { WordProvider } from "./store/WordProvider";

function App() {
  return (
    <WordProvider>
      <NextUIProvider>
        <Layout />
      </NextUIProvider>
    </WordProvider>
  );
}

export default App;
