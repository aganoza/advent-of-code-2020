import { formatInputString, readInputFromFile } from './utils';

/**
 * - The number of inches between the left edge of the fabric and the left edge of the rectangle.
 * - The number of inches between the top edge of the fabric and the top edge of the rectangle.
 * - The width of the rectangle in inches.
 * - The height of the rectangle in inches.
 */

type ClaimDetail = {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

function parseClaim(claim: string): ClaimDetail {
  const id = parseInt(claim.split('@')[0].split('#')[1]);
  const left = parseInt(claim.split('@')[1].split(',')[0]);
  const top = parseInt(
    claim
      .split('@')[1]
      .split(',')[1]
      .split(':')[0]
  );
  const width = parseInt(
    claim
      .split('@')[1]
      .split(',')[1]
      .split(':')[1]
      .split('x')[0]
  );
  const height = parseInt(
    claim
      .split('@')[1]
      .split(',')[1]
      .split(':')[1]
      .split('x')[1]
  );
  return { id, left, top, width, height };
}

function createFabric(height: number, width?: number): string[] {
  const w: number = width === undefined ? height : width;
  let fabric: string[] = [];

  let j = 0;
  for (let i = 0; i < height; ++i, j = 0) {
    fabric[i] = '';
    for (; j < w; ++j) {
      fabric[i] = fabric[i].concat('.');
    }
  }

  return fabric;
}

function replaceAt(string: string, index: number, replacement: string) {
  return (
    string.substr(0, index) +
    replacement +
    string.substr(index + replacement.length)
  );
}

function insertClaimInFabric(
  fabric: string[],
  claimDetail: ClaimDetail
): string[] {
  const { left, top, width, height } = claimDetail;
  let claimedFabric: string[] = fabric;

  let j = left;

  let ni = top + height;
  let nj = left + width;

  for (let i = top; i < ni; ++i, j = left) {
    for (; j < nj; ++j) {
      claimedFabric[i] = replaceAt(
        claimedFabric[i], //string to use for replace
        j, // index of char to replace in the string
        claimedFabric[i].substr(j, 1) == '.' ? '#' : 'X' //Character to replace
      );
    }
  }

  return claimedFabric;
}

function calculateOverlappingInches(
  fabricHeight: number,
  fabricWidth: number,
  input: string = readInputFromFile('03')
): number {
  const claims: string[] = formatInputString(input, /;|\n|\r\n/g);
  let overlappingInches: number = 0;
  let fabric: string[] = createFabric(fabricHeight, fabricWidth);
  // console.log(fabric);

  for (const claim of claims) {
    // console.log(claim);
    const claimDetail: ClaimDetail = parseClaim(claim);
    // console.log(claimDetail);
    fabric = insertClaimInFabric(fabric, claimDetail);
    // console.log(fabric);
  }

  overlappingInches = Array.from(fabric.join('')).filter(el => el === 'X')
    .length;

  return overlappingInches;
}

// 2da Parte

function getIDNonOverlappingClaim(
  fabricHeight: number,
  fabricWidth: number,
  input: string = readInputFromFile('03')
): number | null {
  const claims: string[] = formatInputString(input, /;|\n|\r\n/g);
  let IDNonOverlappingClaim: number | null = null;
  let fabric: string[] = createFabric(fabricHeight, fabricWidth);
  // console.log(fabric);

  for (const claim of claims) {
    // console.log(claim);
    const claimDetail: ClaimDetail = parseClaim(claim);
    // console.log(claimDetail);
    const { claimedFabric, isNonOverlapping } = insertClaimInFabricAlternative(
      fabric,
      claimDetail
    );
    fabric = claimedFabric;
    IDNonOverlappingClaim = isNonOverlapping ? claimDetail.id : null;

    // console.log(fabric);
  }

  return IDNonOverlappingClaim;
}

function insertClaimInFabricAlternative(
  fabric: string[],
  claimDetail: ClaimDetail
) {
  const { id, left, top, width, height } = claimDetail;
  let claimedFabric: string[] = fabric;

  let j = left;

  let ni = top + height;
  let nj = left + width;
  let replaceChar: string;
  let isNonOverlapping: boolean = false;

  for (let i = top; i < ni; ++i, j = left) {
    for (; j < nj; ++j) {
      if (claimedFabric[i].substr(j, 1) == '.') {
        isNonOverlapping = true;
        replaceChar = '#';
      } else {
        isNonOverlapping = false;
        replaceChar = 'X';
      }

      claimedFabric[i] = replaceAt(
        claimedFabric[i], //string to use for replace
        j, // index of char to replace in the string
        replaceChar //Character to replace
      );
    }
  }

  return { claimedFabric, isNonOverlapping };
}

export {
  calculateOverlappingInches,
  createFabric,
  parseClaim,
  insertClaimInFabric,
  getIDNonOverlappingClaim
};
