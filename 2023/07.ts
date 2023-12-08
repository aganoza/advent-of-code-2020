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

  const counts = Object.values(labelCounts).sort((a, b) => b - a);

  // console.log({ uniqueLabels, labelCounts, counts });

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

function getType2(hand: string): number {
  const uniqueLabels = new Set(hand.split(""));
  const labelCounts: { [key: string]: number } = {};

  // Count the occurrences of each label in the hand
  // it's the resulting numbers of parts of the split minus 1
  for (const label of uniqueLabels) {
    labelCounts[label] = hand.split(label).length - 1;
  }

  const counts = Object.entries(labelCounts).sort((a, b) => {
    return b[1] - a[1];
  });

  const jIndex = counts.findIndex((pair) => pair[0] === "J");

  // console.log({ uniqueLabels, labelCounts, counts2: counts, jIndex });

  if (jIndex !== -1) {
    for (let i = 0; i < counts.length; i++) {
      const pair = counts[i];
      // console.log(pair);

      if (pair[0] !== "J") {
        counts[i][1] += counts[jIndex][1];
        // delete counts2[jIndex];
        counts.splice(jIndex, 1);
        break;
      }
    }
  }

  // console.log({ uniqueLabels, labelCounts, counts2: counts, jIndex });

  if (counts[0][1] === 5) {
    return 6; // Five of a kind
  } else if (counts[0][1] === 4) {
    return 5; // Four of a kind
  } else if (counts[0][1] === 3 && counts[1][1] === 2) {
    return 4; // Full house
  } else if (counts[0][1] === 3) {
    return 3; // Three of a kind
  } else if (counts[0][1] === 2 && counts[1][1] === 2) {
    return 2; // Two pair
  } else if (counts[0][1] === 2) {
    return 1; // One pair
  } else {
    return 0; // High card
  }
}

function compareHands2(handA: string, handB: string) {
  for (let i = 0; i < handA.length; i++) {
    const valueA = getCardValue2(handA[i]);
    const valueB = getCardValue2(handB[i]);

    if (valueA !== valueB) {
      return valueA - valueB;
    }
  }

  // If all card values are equal, return 0 (considered a tie)
  // return 0;
  throw new Error(`Tie ${handA} & ${handB}`);
}

function getCardValue2(card: string) {
  const values = "J23456789TQKA";
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

function getNewTotalWinnnigs(input: string = readInputFromFile("07")): number {
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(inputs);

  let result: number = 0;

  let L = [];
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const [hand, bidStr] = input.split(" ");
    const bid = parseInt(bidStr);
    const kind = getType2(hand);
    L.push({ hand, bid, kind });
  }

  L.sort((prev, curr) => {
    // First, compare the kind property
    if (prev.kind !== curr.kind) {
      return prev.kind - curr.kind;
    }

    // If kind values are equal, compare hand values
    return compareHands2(prev.hand, curr.hand);
  });

  L.forEach((x, index) => (result += x.bid * (index + 1)));

  // console.log({ L });

  return result;
}

export { getTotalWinnnigs, getNewTotalWinnnigs };
