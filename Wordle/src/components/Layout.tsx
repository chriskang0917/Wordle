import Board from "./Board";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="h-[100vh] bg-board-background">
        <Board />
      </main>
    </>
  );
}
