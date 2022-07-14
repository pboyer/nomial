## Rootfinder

Rootfinder is a TypeScript implementation of Cem Yuksel's fast, robust, and simple root finding algorithm presented in the paper "High-Performance Polynomial Root Finding for Graphics". It can be used to find real roots of polynomials of degree 10 and higher.

### Usage

```typescript
const f = new Polynomial([-7412, -1505, -20, -10, 1]);

const startSearchInterval = -100;
const endSearchInterval = 100;
const epsilon = 1e-6;

const roots = polynomialRoots(f, startSearchInterval, endSearchInterval, epsilon);
```

### Installing

> npm install rootfinder

or using yarn

> yarn add rootfinder

### Paper

Cem Yuksel. 2022. High-Performance Polynomial Root Finding for Graphics. Proc. ACM Comput. Graph. Interact. Tech. 5, 3, Article 7 (July 2022), 15 pages.
