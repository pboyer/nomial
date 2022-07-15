import { Polynomial, polynomialRoots } from "../src";

const cases = [
    {
        polynomial: new Polynomial([-7412, -1505, -20, -10, 0, 1]),
    },
    {
        polynomial: new Polynomial([-7412, -1505, -20, -10, 12]),
    },
    {
        polynomial: new Polynomial([-7412, -1505, -20, -10]),
    }
];

const t = performance.now();

const count = 100000;

for (let i = 0; i < count; i++) {
    for (const c of cases) {
        const roots = polynomialRoots(c.polynomial);
    }
}

console.log((performance.now() - t) / (count * cases.length), "ms per iteration");
