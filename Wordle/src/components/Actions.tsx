import { Button } from "@nextui-org/react";
import { useContext } from "react";
import toast from "react-hot-toast";
import WordContext, { InitContext } from "../store/WordProvider";

type ContextType = React.Context<InitContext>;

export default function Actions() {
  const { state, dispatch } = useContext(WordContext as ContextType);
  const { answerWord } = state;

  const dispatchReset = () => {
    if (typeof dispatch !== "function") return;
    dispatch({ type: "reset_answer" });
  };

  const handleAnswer = () => {
    dispatchReset();
    toast.error(`很可惜沒能完成，答案是 ${answerWord}`);
  };

  const handleRestart = () => {};

  return (
    <section className="mx-auto mt-8 flex max-w-[350px] items-center justify-between px-2">
      <Button
        className="text-md tracking-wider"
        variant="ghost"
        color="warning"
        onClick={handleAnswer}
      >
        查看答案
      </Button>
      <Button
        className="text-md tracking-wider"
        variant="ghost"
        color="success"
        onClick={handleRestart}
      >
        顯示玩法
      </Button>
    </section>
  );
}
