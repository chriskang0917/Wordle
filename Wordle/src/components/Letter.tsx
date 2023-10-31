interface LetterProps {
  letter: string;
}

export default function Letter({ letter }: LetterProps) {
  return (
    <div className="border-letter-border flex max-w-[62px] items-center justify-center border-2">
      <p className="text-4xl font-bold text-white">{letter}</p>
    </div>
  );
}
