import { LetterState } from "../utils/word-utils";

interface LetterProps {
  letter: string;
  state: LetterState;
}

export default function Letter({ letter, state }: LetterProps) {
  return (
    <div className="border-border flex max-w-[62px] items-center justify-center border-2">
      <p className="text-4xl font-bold text-white">{letter}</p>
    </div>
  );
}
