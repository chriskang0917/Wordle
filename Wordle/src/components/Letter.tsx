import cn from "classnames";
import {
  LetterState,
  animationDelayStyle,
  getAnimatedState,
  letterStateStyle,
} from "../utils/word-utils";

interface LetterProps {
  letter: string;
  state: LetterState;
  order: number;
}

export default function Letter({ letter, state, order }: LetterProps) {
  const letterAnimationStyle = getAnimatedState(letter, state);
  const isWordChecked: boolean =
    state === LetterState.Match ||
    state === LetterState.Miss ||
    state === LetterState.Present;

  return (
    <div
      className={cn(
        letterAnimationStyle,
        letterStateStyle[state],
        { [animationDelayStyle[order]]: isWordChecked },
        "transition-colors duration-[800ms] ease-in-out",
        "flex max-w-[62px] items-center justify-center border-2 border-border",
      )}
    >
      <p className="text-4xl font-bold text-white">{letter}</p>
    </div>
  );
}
