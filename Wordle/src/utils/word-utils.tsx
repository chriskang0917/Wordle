export enum LetterState {
  Empty = "empty",
  Edit = "edit",
  Present = "present",
  Match = "match",
  Miss = "miss",
}

export const letterStateStyle = {
  [LetterState.Empty]: "",
  [LetterState.Edit]: "border-[#585858]",
  [LetterState.Present]: "bg-[#A7944A] border-none",
  [LetterState.Match]: "bg-[#507749] border-none",
  [LetterState.Miss]: "bg-[#333334] border-none",
};

export const computeGuess = (answer: string, guess: string): LetterState[] => {
  const splitAnswer: string[] = answer.split("");
  const splitGuess: string[] = guess.split("");

  return splitGuess.map((letter, index) => {
    const isMatch: boolean = splitAnswer[index] === letter;
    const isPresent: boolean = splitAnswer.includes(letter);

    if (isMatch && isPresent) return LetterState.Match;
    if (isPresent) return LetterState.Present;

    return LetterState.Miss;
  });
};
