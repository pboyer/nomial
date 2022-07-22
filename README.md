## Nomial

Nomial is a TypeScript implementation of Cem Yuksel's extremely fast, robust, and simple root finding algorithm presented in the paper "High-Performance Polynomial Root Finding for Graphics" (2022).

- Find real roots of polynomials of degree 10 and higher.
- No dependencies.
- 1.8 kilobyes minified, 844 bytes minified & gzipped.

## Installation

> npm install nomial

or using yarn

> yarn add nomial

## Usage

### Importing

```typescript
// as a ES module
import { Polynomial, polynomialRoots } from 'nomial';

// as a CommonJS module
const { Polynomial, polynomialRoots } = require('nomial');
```

### Calling

```typescript
// The coefficients are stored in order of increasing exponent.
// This is the polynomial used in this example:
// -7412 - 1505x - 20x^2 - 10x^3 + 2x^4 + x^5
const f = new Polynomial([-7412, -1505, -20, -10, 2, 1]);
const roots = polynomialRoots(f);
```

There are optional arguments to specify the start and end of the search interval and epsilon used to terminate root finding.

```typescript
const startSearchInterval = -100;
const endSearchInterval = 100;
const epsilon = 1e-6;

const roots = polynomialRoots(f, startSearchInterval, endSearchInterval, epsilon);
```

## Resources

This is a great video intro: https://youtu.be/CoGo_3C7xR0?t=7092

Cem Yuksel. 2022. High-Performance Polynomial Root Finding for Graphics. Proc. ACM Comput. Graph. Interact. Tech. 5, 3, Article 7 (July 2022), 15 pages.

## Changelog

- 1.0.11 - Add cubic deflation. Don't use Math.pow in Polynomial.evaluate. 16x faster!
- 1.0.10 - First public release 
