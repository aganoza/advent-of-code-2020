import {
  readInputFromFile,
  formatInputStringComplete,
  formatInputString,
} from "./utils";

function getType(hand: string): number {
  const uniqueLabels = new Set(hand.split(""));
  const labelCounts: { [key: string]: number } = {};

  // Count the occurrences of each label in the hand
  // it's the resulting numbers of parts of the split minus 1
  for (const label of uniqueLabels) {
    labelCounts[label] = hand.split(label).length - 1;
  }

  // console.log({ uniqueLabels, labelCounts });

  const counts = Object.values(labelCounts).sort((a, b) => b - a);

  if (counts[0] === 5) {
    return 6; // Five of a kind
  } else if (counts[0] === 4) {
    return 5; // Four of a kind
  } else if (counts[0] === 3 && counts[1] === 2) {
    return 4; // Full house
  } else if (counts[0] === 3) {
    return 3; // Three of a kind
  } else if (counts[0] === 2 && counts[1] === 2) {
    return 2; // Two pair
  } else if (counts[0] === 2) {
    return 1; // One pair
  } else {
    return 0; // High card
  }
}

function compareHands(handA: string, handB: string) {
  for (let i = 0; i < handA.length; i++) {
    const valueA = getCardValue(handA[i]);
    const valueB = getCardValue(handB[i]);

    if (valueA !== valueB) {
      return valueA - valueB;
    }
  }

  // If all card values are equal, return 0 (considered a tie)
  // return 0;
  throw new Error(`Tie ${handA} & ${handB}`);
}

function getCardValue(card: string) {
  const values = "23456789TJQKA";
  return values.indexOf(card[0]);
}

function getTotalWinnnigs(input: string = readInputFromFile("07")): number {
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(inputs);

  let result: number = 0;

  let L = [];
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const [hand, bidStr] = input.split(" ");
    const bid = parseInt(bidStr);
    const kind = getType(hand);
    L.push({ hand, bid, kind });
  }

  L.sort((prev, curr) => {
    // First, compare the kind property
    if (prev.kind !== curr.kind) {
      return prev.kind - curr.kind;
    }

    // If kind values are equal, compare hand values
    return compareHands(prev.hand, curr.hand);
  });

  L.forEach((x, index) => (result += x.bid * (index + 1)));

  // console.log({ L });

  return result;
}

export { getTotalWinnnigs };
