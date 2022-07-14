"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.derivative = exports.evaluate = void 0;
/**
 * Find the roots of polynomial using the method described in
 * High-Performance Polynomial Root Finding for Graphics (Yuksel 2022)
 *
 * @param coeffs coeffs of the polynomial
 * @param startInterval beginning of interval to search (defaults to -1000)
 * @param endInterval end of interval to search (defaults to 1000)
 * @param epsilon tolerance for root finding (defaults to 1e-6)
 * @returns An array of roots
 */
function polynomialRoots(coeffs, startInterval = -1000, endInterval = 1000, epsilon = 1e-6) {
    if (degree(coeffs) === 2) {
        return findQuadraticRoots(coeffs, startInterval, endInterval);
    }
    const derivCoeffs = derivative(coeffs);
    const rootsOfDerivative = polynomialRoots(derivCoeffs, startInterval, endInterval, epsilon);
    rootsOfDerivative.push(endInterval);
    let a = startInterval;
    const roots = [];
    for (let i = 0; i < rootsOfDerivative.length; i++) {
        let b = rootsOfDerivative[i];
        if (Math.sign(evaluate(coeffs, a)) !== Math.sign(evaluate(coeffs, b))) {
            roots.push(findRoot(coeffs, derivCoeffs, a, b, epsilon));
        }
        a = b;
    }
    return roots;
}
exports.default = polynomialRoots;
function evaluate(coeffs, x) {
    let result = 0;
    for (let i = 0, l = coeffs.length; i < l; i++) {
        result += coeffs[i] * Math.pow(x, i);
    }
    return result;
}
exports.evaluate = evaluate;
function degree(coeffs) {
    return coeffs.length - 1;
}
function derivative(coeffs) {
    if (degree(coeffs) === 0) {
        throw new Error("Cannot take derivative of constant polynomial");
    }
    const outcoeffs = [];
    for (let i = 1; i < coeffs.length; i++) {
        outcoeffs.push(coeffs[i] * i);
    }
    return outcoeffs;
}
exports.derivative = derivative;
function findQuadraticRoots(coeffs, startInterval, endInterval) {
    const c = coeffs[0];
    const b = coeffs[1];
    const a = coeffs[2];
    const delta = b * b - 4 * a * c;
    if (delta >= 0) {
        const d = Math.sqrt(delta);
        const q = -0.5 * (b + multSign(d, b));
        const rv0 = q / a;
        const rv1 = c / q;
        const res = [];
        const aa = Math.min(rv0, rv1);
        const bb = Math.max(rv0, rv1);
        if (aa >= startInterval && aa <= endInterval) {
            res.push(aa);
        }
        if (bb >= startInterval && bb <= endInterval) {
            res.push(bb);
        }
        return res;
    }
    return [];
}
function multSign(v, sign) {
    return v * (sign < 0 ? -1 : 1);
}
// Following http://www.cemyuksel.com/research/polynomials/polynomial_roots_hpg2022_supplemental.pdf
function findRoot(coeffs, derivCoeffs, x1, x2, epsilon) {
    let xr = (x1 + x2) / 2;
    if (Math.abs(x2 - x1) <= 2 * epsilon) {
        return xr;
    }
    if (degree(coeffs) === 3) {
        let xn = -0;
        for (let i = 0; i < 10; i++) {
            xn = xr - evaluate(coeffs, xr) / evaluate(derivCoeffs, xr);
            xn = Math.max(x1, Math.min(x2, xn));
            if (Math.abs(xr - xn) <= epsilon) {
                return xn;
            }
            xr = xn;
        }
        if (xr < x1 || xr > x2) {
            xr = (x1 + x2) / 2;
        }
    }
    const y1 = evaluate(coeffs, x1);
    let yr = evaluate(coeffs, xr);
    while (true) {
        if (Math.sign(yr) === Math.sign(y1)) {
            x1 = xr;
        }
        else {
            x2 = xr;
        }
        let xn = xr - yr / evaluate(derivCoeffs, xr);
        if (x1 < xn && xn < x2) {
            if (Math.abs(xr - xn) > epsilon) {
                xr = xn;
                yr = evaluate(coeffs, xr);
            }
            else {
                if (Math.sign(yr) === Math.sign(y1)) {
                    xr = xn + epsilon;
                }
                else {
                    xr = xn - epsilon;
                }
                const y = evaluate(coeffs, xr);
                if (Math.sign(y) !== Math.sign(yr)) {
                    return xn;
                }
                else {
                    yr = y;
                }
            }
        }
        else {
            xr = (x1 + x2) / 2;
            if (xr === x1 || xr === x2 || x2 - x1 <= 2 * epsilon) {
                return xr;
            }
            else {
                yr = evaluate(coeffs, xr);
            }
        }
    }
}
