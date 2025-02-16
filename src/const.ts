function getValueFromNumbersMap(value: string, logging: boolean) {
  const numbersMap: { [number: string]: number } = {
    zero: 0,
    zéro: 0,
    un: 1,
    deux: 2,
    trois: 3,
    quatre: 4,
    cinq: 5,
    six: 6,
    sept: 7,
    huit: 8,
    neuf: 9,
    dix: 10,
    onze: 11,
    douze: 12,
    treize: 13,
    quatorze: 14,
    quinze: 15,
    seize: 16,
    vingt: 20,
    vingts: 20,
    trente: 30,
    quarante: 40,
    cinquante: 50,
    soixante: 60,
    septante: 70, // Belgium/Swiss
    'quatre vingts': 80,
    huitante: 80, // Swiss
    nonante: 90, // Belgium/Swiss
    cent: 100,
    cents: 100,
    mille: 1000, // unvariable
    million: 1e6,
    millions: 1e6,
    milliard: 1e9,
    milliards: 1e9,
    billion: 1e12,
    billions: 1e12,
    trillion: 1e15,
    trillions: 1e15,
  };

  const correspondingValue = numbersMap[value];
  if (logging && typeof correspondingValue !== 'number') {
    console.log(`Failed to parse value to number at "${value}"`);
  }

  return correspondingValue;
}

export { getValueFromNumbersMap };
