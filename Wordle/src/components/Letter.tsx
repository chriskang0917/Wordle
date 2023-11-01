import cn from "classnames";
import {
  LetterState,
  getAnimatedState,
  letterStateStyle,
} from "../utils/word-utils";

interface LetterProps {
  letter: string;
  state: LetterState;
  order: number;
}

const animationDelay = [
  "animate-delay-0",
  "animate-delay-[400ms]",
  "animate-delay-[800ms]",
  "animate-delay-[1200ms]",
  "animate-delay-[1600ms]",
];

export default function Letter({ letter, state, order }: LetterProps) {
  const letterAnimationStyle = getAnimatedState(letter, state);
  const isWordChecked: boolean =
    state === LetterState.Match ||
    state === LetterState.Miss ||
    state === LetterState.Present;

  // TODO: 將旋轉的動畫，和狀態的顏色整理在一起顯示

  return (
    <div
      className={cn(
        letterAnimationStyle,
        letterStateStyle[state],
        { [animationDelay[order]]: isWordChecked },
        "flex max-w-[62px] items-center justify-center border-2",
      )}
    >
      <p className="text-4xl font-bold text-white">{letter}</p>
    </div>
  );
}
