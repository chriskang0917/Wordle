export const enum LetterState {
  Empty = "empty",
  Edit = "edit",
  Present = "present",
  Match = "match",
  Miss = "miss",
}

export const letterStateStyle = {
  [LetterState.Empty]: "border-border",
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

export const enum AnimationState {
  Edit = "edit",
  Check = "check",
}

export const animationStateStyle = {
  [AnimationState.Edit]: "animate-jump animate-duration-300",
  [AnimationState.Check]:
    "animate-rotate-x animate-duration-800 animate-ease-in-out",
};

export const getAnimatedState = (letter: string, state: LetterState) => {
  const isEdit: boolean = state === LetterState.Edit;
  const isChecked: boolean =
    state === LetterState.Match ||
    state === LetterState.Miss ||
    state === LetterState.Present;

  if (letter && isEdit) return animationStateStyle[AnimationState.Edit];
  if (letter && isChecked) return animationStateStyle[AnimationState.Check];
};
