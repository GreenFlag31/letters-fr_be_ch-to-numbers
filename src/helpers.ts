import { getValueFromNumbersMap } from './const';

function splitAccordingToSeparator(originalText: string, customSeparator: string) {
  const cleaned = cleanText(originalText);
  const VIRGULE_IN_LETTERS = 'virgule';
  const VIRGULE_SYMBOL = ',';
  const EUROS = 'euros';

  if (customSeparator) {
    const splittedWithCustomSeparator = cleaned.split(customSeparator);

    const split = getSplit(splittedWithCustomSeparator);
    return split;
  }

  const splittedWithVirguleLetters = cleaned.split(VIRGULE_IN_LETTERS);
  const splittedWithVirguleSymbol = cleaned.split(VIRGULE_SYMBOL);
  const splittedWithEuros = cleaned.split(EUROS);

  const split = getSplit(splittedWithVirguleLetters, splittedWithVirguleSymbol, splittedWithEuros);

  return split;
}

/**
 * Get the two part array of the given split sequence.
 */
function getSplit(...splitted: string[][]) {
  for (const split of splitted) {
    if (split.length > 2) throw new Error('Cannot determine integer or decimal part');
    if (split.length === 2) return split;
  }

  return splitted[0];
}

/**
 * Clean text from special characters.
 * Facilitate analyse and parsing.
 */
function cleanText(text: string) {
  return text.replace(/[-_]/gim, ' ').trim().toLowerCase();
}

/**
 * Transforms given letters to number according to the numbers map.
 */
function transformLettersToNumbers(text: string, logging: boolean) {
  const words = text.split(' ');
  const numbersCollection: number[] = [];
  const vingts = ['vingt', 'vingts'];

  for (let i = 0; i < words.length; i++) {
    let currentWord = words[i];
    const nextWord = words[i + 1];

    if (currentWord === 'quatre' && vingts.includes(nextWord)) {
      currentWord = 'quatre vingts';
      i++;
    }

    const value = getValueFromNumbersMap(currentWord, logging);
    if (typeof value === 'number') numbersCollection.push(value);
  }

  return numbersCollection;
}

function splitArrayInArraysOfMultiplicationRanges(numbers: number[]) {
  const ranges = getMaxRanges(numbers);
  let lastRangeIndex = 0;
  const arrayOfRanges: number[][] = [];

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];

    if (range === ranges.at(-1)) {
      // last element
      arrayOfRanges.push(numbers.slice(lastRangeIndex));
      break;
    }

    const findElement = numbers.findIndex((element) => element === range);
    if (findElement === -1) continue; // can be absent

    const inclusiveIndex = findElement + 1;
    arrayOfRanges.push(numbers.slice(lastRangeIndex, inclusiveIndex));
    lastRangeIndex = inclusiveIndex;
  }

  return arrayOfRanges;
}

function computeTotalAroundPivots(arrayOfRanges: number[][]) {
  const totalAroundPivot: number[] = [];

  for (let i = 0; i < arrayOfRanges.length; i++) {
    const multiRange = arrayOfRanges[i];

    const firstElementIsAPivot = valueIsAMultiplicationPivot(multiRange[0]);

    // neutral element for multiplication or addition
    let localTotal = firstElementIsAPivot ? 1 : 0;

    for (let j = 0; j < multiRange.length; j++) {
      const range = multiRange[j];

      const rangeIsAPivot = valueIsAMultiplicationPivot(range);
      if (!rangeIsAPivot) {
        localTotal += range;
        continue;
      }

      localTotal *= range;
    }

    totalAroundPivot.push(localTotal);
  }

  return totalAroundPivot;
}

function valueIsAMultiplicationPivot(value: number) {
  const multiplicationPivots = [100, 1000, 1e6, 1e9, 1e12, 1e15];

  return multiplicationPivots.includes(value);
}

/**
 * Find the max of the current numbers to identify multiplication pivots.
 */
function getMaxRanges(numbers: number[]) {
  const multiplicationPivots = [1e15, 1e12, 1e9, 1e6, 1000, 100];
  const max = Math.max(...numbers);

  const findMax = multiplicationPivots.findIndex((element) => element === max);

  if (findMax === -1) return numbers;

  return multiplicationPivots.slice(findMax);
}

function getGeneralTotal(partialTotal: number[]) {
  return partialTotal.reduce((acc, current) => {
    return acc + current;
  }, 0);
}

/**
 * A negative number contains 'moins' in the integer part.
 */
function handleNegativeNumbers(integerPart: string, total: number) {
  const isNegative = integerPart.includes('moins');

  return isNegative ? total * -1 : total;
}

function handleIntegersPart(integerPart: string, logging: boolean) {
  const integers = transformLettersToNumbers(integerPart, logging);
  const arrayOfRanges = splitArrayInArraysOfMultiplicationRanges(integers);
  if (arrayOfRanges.length === 0) return null;

  const totalNumbers = computeTotalAroundPivots(arrayOfRanges);

  return totalNumbers;
}

/**
 * Defaulted to division by 100.
 */
function handleDecimalsPart(decimalPart: string | undefined, logging: boolean) {
  if (!decimalPart) return 0;
  const CENTS_ENDING = 'cents';

  decimalPart = decimalPart.replace(CENTS_ENDING, '');
  const numberZeroRegex = new RegExp(/zero|zéro/, 'g');
  const numberZero = decimalPart.match(numberZeroRegex)?.length;
  const DIVISOR = 10 ** ((numberZero || 1) + 1);

  const decimals = transformLettersToNumbers(decimalPart, logging);
  const total = getGeneralTotal(decimals);

  return total / DIVISOR;
}

export {
  splitAccordingToSeparator,
  cleanText,
  valueIsAMultiplicationPivot,
  getMaxRanges,
  transformLettersToNumbers,
  splitArrayInArraysOfMultiplicationRanges,
  computeTotalAroundPivots,
  getGeneralTotal,
  handleDecimalsPart,
  handleIntegersPart,
  handleNegativeNumbers,
};
