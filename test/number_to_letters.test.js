const assert = require('chai').assert;
const getNumbersFrom = require('../dist/lettersToNumbers').getNumbersFrom;

describe('getNumbersFrom', () => {
  it('should find million range number', () => {
    const numbers = getNumbersFrom(
      'un million deux cent cinquante mille cent cinquante euros et quatre vingts trois centimes'
    );

    assert.equal(numbers, 1250150.83);
  });

  it('should handle simple numbers', () => {
    const numbers = getNumbersFrom('quatre-vingt-dix-neuf');
    assert.equal(numbers, 99);
  });

  it('should handle large numbers', () => {
    const numbers = getNumbersFrom('deux milliards trois cent millions');
    assert.equal(numbers, 2300000000);
  });

  it('should handle decimal numbers', () => {
    const numbers = getNumbersFrom('trois virgule quatorze');
    assert.equal(numbers, 3.14);
  });

  it('should return null for no numbers', () => {
    const numbers = getNumbersFrom('aucun nombre ici');
    assert.equal(numbers, null);
  });

  it('should handle numbers in a sentence', () => {
    const numbers = getNumbersFrom(
      `j'ai payé vingt-sept euros et cinquante centimes pour ce livre.`
    );
    assert.equal(numbers, 27.5);
  });

  it('should handle negative numbers', () => {
    const numbers = getNumbersFrom('moins cent vingt-trois');
    assert.equal(numbers, -123);
  });

  it('should handle negative numbers', () => {
    const numbers = getNumbersFrom('zéro virgule vingt-trois euros');

    assert.equal(numbers, 0.23);
  });

  it('should handle mixed numeric expressions', () => {
    const numbers = getNumbersFrom('cent vingt euros et cinquante centimes.');
    assert.equal(numbers, 120.5);
  });

  it('should handle numbers with words in between', () => {
    const numbers = getNumbersFrom('Le total est de cinquante et un euros et vingt-huit centimes.');
    assert.equal(numbers, 51.28);
  });

  it('should handle zero', () => {
    const numbers = getNumbersFrom('zéro');
    assert.equal(numbers, 0);
  });

  it('should handle the smallest positive number', () => {
    const numbers = getNumbersFrom('un');
    assert.equal(numbers, 1);
  });

  it('should handle the smallest negative number', () => {
    const numbers = getNumbersFrom('moins un');
    assert.equal(numbers, -1);
  });

  it('should handle very large numbers', () => {
    const numbers = getNumbersFrom(
      'neuf cent quatre-vingt-dix-neuf billions neuf cent quatre-vingt-dix-neuf milliards neuf cent quatre-vingt-dix-neuf millions neuf cent quatre-vingt-dix-neuf mille neuf cent quatre-vingt-dix-neuf'
    );
    assert.equal(numbers, 999999999999999);
  });

  it('should handle a standalone decimal number', () => {
    const numbers = getNumbersFrom('zéro virgule zéro zéro un');
    assert.equal(numbers, 0.001);
  });

  it('should handle invalid inputs gracefully', () => {
    const numbers = getNumbersFrom('blablabla');
    assert.equal(numbers, null);
  });

  it('should handle numbers with different forms of spaces', () => {
    const numbers = getNumbersFrom('cinquante et un');
    assert.equal(numbers, 51);
  });

  it('should handle numbers with custom separator', () => {
    const numbers = getNumbersFrom('cinquante et un dollars et trente centimes', 'dollars');
    assert.equal(numbers, 51.3);
  });

  it('should handle swiss numbers', () => {
    const numbers = getNumbersFrom('mille huitante neuf');
    assert.equal(numbers, 1089);
  });

  it('should handle large decimal numbers', () => {
    const numbers = getNumbersFrom(
      'cent vingt-trois millions quatre cent cinquante-six mille sept cent quatre-vingt-neuf virgule cinquante-six'
    );
    assert.equal(numbers, 123456789.56);
  });

  it('should handle belgian numbers test 1', () => {
    const numbers = getNumbersFrom('Trois millions sept cent septante neuf mille');
    assert.equal(numbers, 3779000);
  });

  it('should handle belgian numbers test 2', () => {
    const numbers = getNumbersFrom('Mille euros et nonante huit centimes');
    assert.equal(numbers, 1000.98);
  });

  it('should handle french numbers test 1', () => {
    const numbers = getNumbersFrom('Cinq cents soixante seize');
    assert.equal(numbers, 576);
  });

  it('should handle french numbers test 2', () => {
    const numbers = getNumbersFrom('Cinq cents quatre vingts seize');
    assert.equal(numbers, 596);
  });

  it('should handle numbers with multiple currency mentions with useless default supported separator', () => {
    const numbers = getNumbersFrom(
      'J’ai payé deux mille trois cent euros et cinquante centimes pour cette voiture.',
      'euros'
    );
    assert.equal(numbers, 2300.5);
  });

  it('should handle swiss numbers with different variants', () => {
    const numbers = getNumbersFrom('septante-huit mille deux cent nonante-cinq');
    assert.equal(numbers, 78295);
  });

  it('should handle large numbers with different groupings', () => {
    const numbers = getNumbersFrom(
      'deux milliards cinquante-six millions cent vingt mille quatre cent trente-neuf'
    );
    assert.equal(numbers, 2056120439);
  });

  it('should handle negative numbers', () => {
    const numbers = getNumbersFrom('moins deux cent trente-quatre');
    assert.equal(numbers, -234);
  });

  it('should handle complex belgian numbers', () => {
    const numbers = getNumbersFrom(
      'Quatre-vingt-sept millions neuf cent septante-sept mille trois cent quarante-cinq'
    );
    assert.equal(numbers, 87977345);
  });

  it('should handle french numbers with "et" usage', () => {
    const numbers = getNumbersFrom('Quatre cent vingt et un mille cinq cent trente-sept');
    assert.equal(numbers, 421537);
  });

  it('can ends with cents (plural)', () => {
    const numbers = getNumbersFrom('Septante-cinq euros et quarante-neuf cents');

    assert.equal(numbers, 75.49);
  });

  it('can ends with cent (singular)', () => {
    const numbers = getNumbersFrom('Septante-cinq euros et un cent');

    assert.equal(numbers, 75.01);
  });
});
