import {
  getGeneralTotal,
  handleDecimalsPart,
  handleIntegersPart,
  handleNegativeNumbers,
  splitAccordingToSeparator,
} from './helpers';

/**
 * Transform a sentence of letters to a number.
 * @param {string} text The text to be transformed to a number.
 * @param {string} customSeparator Provide a custom separator.
 * @param {boolean} logging Usefull for debug.
 * @returns {number} A Javascript number or null if no number found.
 * Format the number with different locales with the native Intl. NumberFormat if needed.
 */
function getNumbersFrom(text: string, customSeparator = '', logging = false) {
  const totalIntAndDecimals: number[] = [];
  const getSplittedSentence = splitAccordingToSeparator(text, customSeparator);
  const integerPart = getSplittedSentence[0].trim();
  const decimalPart = getSplittedSentence[1]?.trim();

  const totalIntegers = handleIntegersPart(integerPart, logging);

  if (totalIntegers === null) return null;

  const totalDecimals = handleDecimalsPart(decimalPart, logging);
  totalIntAndDecimals.push(...totalIntegers, totalDecimals);

  const total = getGeneralTotal(totalIntAndDecimals);
  const totalSigned = handleNegativeNumbers(integerPart, total);
  console.log(totalSigned);
  return totalSigned;
}

getNumbersFrom('Mille septante euros');
export { getNumbersFrom };
