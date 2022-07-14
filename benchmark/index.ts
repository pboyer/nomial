import findRoots from "../dist";

const cases = [
    {
        coefficients: [-7412, -1505, -20, -10, 0, 1],
    },
    {
        coefficients: [-7412, -1505, -20, -10, 12, 1],
    },
    {
        coefficients: [-7412, -1505, -20, -10, 12],
    }
];

const t = performance.now();

const count = 100000;

for (let i = 0; i < count; i++) {
    for (const c of cases) {
        const roots = findRoots(c.coefficients);
    }
}

console.log((performance.now() - t) / (count * cases.length), "ms per iteration");
