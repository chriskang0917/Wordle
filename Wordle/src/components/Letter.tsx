interface LetterProps {
  letter: string;
}

export default function Letter({ letter }: LetterProps) {
  return <div>{letter}</div>;
}
