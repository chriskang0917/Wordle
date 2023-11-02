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

const getFilteredAnswerLetterMap = (
  splitAnswer: string[],
  splitGuess: string[],
) => {
  type LetterMap = { [key: string]: number };

  const letterMap = splitAnswer.reduce((acc: LetterMap, curr: string) => {
    acc[curr] ? (acc[curr] += 1) : (acc[curr] = 1);
    return acc;
  }, {});

  splitGuess.forEach((letter, index) => {
    if (splitAnswer[index] === letter) {
      letterMap[letter] -= 1;
    }
  });

  return letterMap;
};

export const computeGuess = (answer: string, guess: string): LetterState[] => {
  const splitAnswer: string[] = answer.split("");
  const splitGuess: string[] = guess.split("");

  const filteredLetterMap = getFilteredAnswerLetterMap(splitAnswer, splitGuess);

  return splitGuess.map((letter, index) => {
    const isMatch: boolean = splitAnswer[index] === letter;
    const isPresent: boolean = splitAnswer.includes(letter);
    const letterCount: number = filteredLetterMap[letter];

    if (isMatch && isPresent) return LetterState.Match;

    if (isPresent && letterCount > 0) {
      filteredLetterMap[letter] -= 1;
      return LetterState.Present;
    }

    if (isPresent && letterCount === 0) return LetterState.Miss;

    return LetterState.Miss;
  });
};

export const enum AnimationState {
  Edit = "edit",
  Check = "check",
}

const animationStateStyle = {
  [AnimationState.Edit]: "animate-jump animate-duration-100",
  [AnimationState.Check]: "animate-rotate-x animate-ease-in-out",
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
