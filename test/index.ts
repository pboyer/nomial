import { Polynomial, polynomialRoots } from "../dist";
import { strict as assert } from "assert";

const cases = [
    {
        coefficients: [-7412, -1505, -20, -10, 0, 1],
        startInterval: -1000,
        endInterval: 1000,
        epsilon: 1e-6,
        expectedCount: 1
    },
    {
        coefficients: [-7412, -1505, -20, -10, 12, 1],
        startInterval: -1000,
        endInterval: 1000,
        epsilon: 1e-6,
        expectedCount: 3
    },
    {
        coefficients: [-7412, -1505, -20, -10, 12],
        startInterval: -1000,
        endInterval: 1000,
        epsilon: 1e-6,
        expectedCount: 2
    }
];

for (const c of cases) {
    const f = new Polynomial(c.coefficients);
    const roots = polynomialRoots(f, c.startInterval, c.endInterval, c.epsilon);

    assert.equal(roots.length, c.expectedCount);

    for (const root of roots) {
        assert.ok(c.startInterval <= root && root <= c.endInterval);
        assert.ok(Math.abs(f.evaluate(root)) < c.epsilon);
    }
}
