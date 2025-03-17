# letters-fr_be_ch-to-numbers

A lightweight JavaScript library that parses text into numbers, supporting the French, Belgian, and Swiss number formats.

## Getting started

### Package installation

Installation:

```sh
npm install letters-fr_be_ch-to-numbers
```

## Examples

```javascript
getNumbersFrom('quatre-vingt-dix-neuf'); // 99
getNumbersFrom('nonante neuf'); // 99
getNumbersFrom('mille huitante neuf'); // 1089
getNumbersFrom('moins cent vingt-trois'); // -123
getNumbersFrom('zéro virgule zéro zéro un'); // 0.001
getNumbersFrom('Quatre cent vingt et un mille cinq cent trente-sept'); // 421537

// if you wish to pass a custom separator (default support: "virgule", ",", "euros")
getNumbersFrom('cinquante et un dollars et trente centimes', 'dollars'); // 51.3
```

## File a bug, got a new idea, or want to contribute?

Feel free! [Open a ticket](https://github.com/GreenFlag31/letters-fr_be_ch-to-numbers/issues).

## Changelog

0.0.2: Bug fixes.

## Discover others libraries

All libraries are permanently supported. Discover them [here](https://www.npmjs.com/~greenflag31).
