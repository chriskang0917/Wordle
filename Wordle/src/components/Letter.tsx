import cn from "classnames";
import { LetterState, letterStateStyle } from "../utils/word-utils";

interface LetterProps {
  letter: string;
  state: LetterState;
}

export default function Letter({ letter, state }: LetterProps) {
  return (
    <div
      className={cn(
        letterStateStyle[state],
        "flex max-w-[62px] items-center justify-center border-2",
      )}
    >
      <p className="text-4xl font-bold text-white">{letter}</p>
    </div>
  );
}
