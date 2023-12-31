import { wordBank } from "../assets/wordBank";

export const enum LetterState {
  Empty = "empty",
  Edit = "edit",
  Present = "present",
  Match = "match",
  Miss = "miss",
}

export const enum AnimationState {
  Edit = "edit",
  Check = "check",
}

export const letterStateStyle = {
  [LetterState.Empty]: "border-border",
  [LetterState.Edit]: "border-[#585858]",
  [LetterState.Present]: "bg-[#A7944A]",
  [LetterState.Match]: "bg-[#507749]",
  [LetterState.Miss]: "bg-[#333334]",
};

const animationStateStyle = {
  [AnimationState.Edit]: "animate-jump animate-duration-100",
  [AnimationState.Check]:
    "animate-rotate-x animate-ease-in-out animation-duration-[800ms]",
};

export const animationDelayStyle = [
  "animate-delay-0 delay-0",
  "animate-delay-[400ms] delay-[400ms]",
  "animate-delay-[800ms] delay-[800ms]",
  "animate-delay-[1200ms] delay-[1200ms]",
  "animate-delay-[1600ms] delay-[1600ms]",
];

export const getRandomWord = () => {
  const randomSeed: number = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomSeed].toUpperCase();
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

export const getAnimatedState = (letter: string, state: LetterState) => {
  const isEdit: boolean = state === LetterState.Edit;
  const isChecked: boolean =
    state === LetterState.Match ||
    state === LetterState.Miss ||
    state === LetterState.Present;

  if (letter && isEdit) return animationStateStyle[AnimationState.Edit];
  if (letter && isChecked) return animationStateStyle[AnimationState.Check];
};
